import { BooleanStateControl, eventHandlerControl, jsonControl, Section, toJSONObject, UICompBuilder, withDefault, withExposingConfigs } from 'lowcoder-sdk';
import AppButton from './base';
import { exposingConfigs, staticProps } from './config';

let ButtonCompBase = (function () {
  const childrenMap = {
    staticProps: jsonControl(toJSONObject, staticProps),
    visible: withDefault(BooleanStateControl, 'true'),
    loading: withDefault(BooleanStateControl, 'false'),
    disabled: withDefault(BooleanStateControl, 'false'),
    onEvent: eventHandlerControl([
      {
        label: 'onClick',
        value: 'click',
        description: 'Triggers when Button is clicked.',
      },
    ]),
  };

  return new UICompBuilder(childrenMap, (props: { onEvent: any; staticProps: any[] | null | undefined; visible: any; loading: any; disabled: any }) => {
    const handleClick = () => {
      props.onEvent('click');
    };

    return <AppButton {...props.staticProps} disabled={props.disabled.value} loading={props.loading.value} visible={props.visible.value} onClick={handleClick}></AppButton>;
  })
    .setPropertyViewFn((children: any) => {
      return (
        <>
          <Section name='Props'>
            {children.staticProps.propertyView({ label: 'Static Props' })}
            {children.visible.propertyView({ label: 'Visible' })}
            {children.loading.propertyView({ label: 'Loading' })}
            {children.disabled.propertyView({ label: 'Disabled' })}
          </Section>
          <Section name='Event'>{children.onEvent.getPropertyView()}</Section>
          <Section name='Description'>
            <ol className='text-sm p-0 m-0 mx-3'>
              <li>Static Props area should contain only static props of Primereact Button.</li>
              <li>
                <a href='https://primereact.org/button/' target='_blank'>
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

export default withExposingConfigs(ButtonCompBase, exposingConfigs);
