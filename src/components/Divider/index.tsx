import { jsonControl, Section, toJSONObject, UICompBuilder, withExposingConfigs } from 'lowcoder-sdk';
import AppDivider from './base';
import { exposingConfigs, staticProps } from './config';
let DividerCompBase = (function () {
  const childrenMap = {
    staticProps: jsonControl(toJSONObject, staticProps),
  };

  return new UICompBuilder(childrenMap, (props: { staticProps: any[] | null | undefined }) => {
    return <AppDivider {...props.staticProps}></AppDivider>;
  })
    .setPropertyViewFn((children: any) => {
      return (
        <>
          <Section name='Props'>{children.staticProps.propertyView({ label: 'Static Props' })}</Section>
          <Section name='Description'>
            <ol className='text-sm p-0 m-0 mx-3'>
              <li>Static Props area should contain only static props of Primereact Divider.</li>
              <li>
                <a href='https://primereact.org/divider/' target='_blank'>
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

export default withExposingConfigs(DividerCompBase, exposingConfigs);
