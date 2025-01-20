import {
  hiddenPropertyView,
  jsonControl,
  NameConfig,
  NameConfigHidden,
  Section,
  toJSONObject,
  UICompBuilder,
  withExposingConfigs,
} from 'lowcoder-sdk';
import { Divider } from 'primereact/divider';

const defStaticProps = {
  layout: 'horizontal',
  type: 'dashed',
};

let DividerCompBase = (function () {
  const childrenMap = {
    staticProps: jsonControl(toJSONObject, defStaticProps),
  };

  return new UICompBuilder(childrenMap, (props: any) => {
    return <Divider {...props.staticProps}></Divider>;
  })
    .setPropertyViewFn((children: any) => {
      return (
        <>
          <Section name="Props">{children.staticProps.propertyView({ label: 'Static Props' })}</Section>
          <Section name="Interaction">{hiddenPropertyView(children)}</Section>
          <Section name="Description">
            <ol className="text-sm p-0 m-0 mx-4">
              <li>Static Props area should contain only static props of Primereact Divider.</li>
              <li>
                <a href="https://primereact.org/divider/" target="_blank">
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

const exposingConfigs = [new NameConfig('staticProps'), NameConfigHidden];

export default withExposingConfigs(DividerCompBase, exposingConfigs);
