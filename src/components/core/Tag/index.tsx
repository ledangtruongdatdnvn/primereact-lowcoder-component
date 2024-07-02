import {
  hiddenPropertyView,
  jsonControl,
  NameConfig,
  NameConfigHidden,
  Section,
  StringControl,
  toJSONObject,
  UICompBuilder,
  withDefault,
  withExposingConfigs
} from 'lowcoder-sdk';
import {Tag} from 'primereact/tag';

const defStaticProps = {severity: 'success'};
const defValue = 'Success';

let TagCompBase = (function () {
  const childrenMap = {
    staticProps: jsonControl(toJSONObject, defStaticProps), value: withDefault(StringControl, defValue),
  };

  return new UICompBuilder(childrenMap, (props: any) => {
    return <Tag {...props.staticProps} value={props.value}></Tag>;
  })
    .setPropertyViewFn((children: any) => {
      return (<>
        <Section name='Basic'>
          {children.staticProps.propertyView({label: 'Static Props'})}
          {children.value.propertyView({label: 'Value'})}
        </Section>
        <Section name='Interaction'>
          {hiddenPropertyView(children)}
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
      </>);
    })
    .build();
})();

const exposingConfigs = [new NameConfig('staticProps'), new NameConfig('value'), NameConfigHidden];
export default withExposingConfigs(TagCompBase, exposingConfigs);
