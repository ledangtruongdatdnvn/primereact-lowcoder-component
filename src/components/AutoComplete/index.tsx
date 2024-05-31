import { eventHandlerControl, jsonControl, jsonExposingStateControl, Section, stringExposingStateControl, toJSONObject, toJSONObjectArray, UICompBuilder, withExposingConfigs } from 'lowcoder-sdk';
import AppAutoComplete from './base';

import { defaultSuggestions, defaultValue, exposingConfigs, staticProps } from './config';

let AutoCompleteCompBase = (function () {
  const childrenMap = {
    staticProps: jsonControl(toJSONObject, staticProps),
    value: stringExposingStateControl('value', defaultValue),
    suggestions: jsonExposingStateControl('suggestions', toJSONObjectArray, defaultSuggestions),
    onEvent: eventHandlerControl([
      {
        label: 'onChange',
        value: 'change',
        description: 'Triggers when Auto Complete is changed.',
      },
      {
        label: 'completeMethod',
        value: 'complete',
        description: 'Triggers when Auto Complete is completed.',
      },
    ]),
  };

  return new UICompBuilder(childrenMap, (props: { suggestions: any; onEvent: any; value: any; staticProps: any | null | undefined }) => {
    const handleChange = (e: any) => {
      props.value.onChange(e.target.value);
      props.onEvent('change');
    };

    const search = (e: any) => {
      props.onEvent('complete');
    };

    return <AppAutoComplete {...props.staticProps} suggestions={props.suggestions.value} value={props.value.value} completeMethod={search} onChange={handleChange}></AppAutoComplete>;
  })
    .setPropertyViewFn((children: any) => {
      return (
        <>
          <Section name='Basic'>
            {children.staticProps.propertyView({ label: 'Static Props' })}
            {children.value.propertyView({ label: 'Value' })}
            {children.suggestions.propertyView({ label: 'Suggestions' })}
          </Section>
          <Section name='Event'>{children.onEvent.getPropertyView()}</Section>
          <Section name='Description'>
            <ol className='text-sm p-0 m-0 mx-3'>
              <li>Static Props area should contain only static props of Primereact AutoComplete.</li>
              <li>
                <a href='https://primereact.org/autocomplete/' target='_blank'>
                  More information
                </a>
              </li>
            </ol>
          </Section>
        </>
      );
    })
    .build();
})();

export default withExposingConfigs(AutoCompleteCompBase, exposingConfigs);
