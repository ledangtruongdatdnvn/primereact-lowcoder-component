import { jsonControl, Section, StringControl, toJSONObject, UICompBuilder, withDefault, withExposingConfigs } from 'lowcoder-sdk';
import Tag from './base';
import { defaultValue, exposingConfigs, staticProps } from './config';
let TagCompBase = (function () {
  const childrenMap = {
    staticProps: jsonControl(toJSONObject, staticProps),
    value: withDefault(StringControl, defaultValue),
  };

  return new UICompBuilder(childrenMap, (props: { value: any; staticProps: any[] | null | undefined }) => {
    return <Tag {...props.staticProps} value={props.value}></Tag>;
  })
    .setPropertyViewFn((children: any) => {
      return (
        <>
          <Section name='Basic'>
            {children.staticProps.propertyView({ label: 'Static Props' })}
            {children.value.propertyView({ label: 'Value' })}
          </Section>
          <Section name='Description'>
            <ol className='text-sm p-0 m-0 mx-3'>
              <li>Static Props area should contain only static props of Primereact Tag.</li>
              <li>
                <a href='https://primereact.org/tag/' target='_blank'>
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

export default withExposingConfigs(TagCompBase, exposingConfigs);
