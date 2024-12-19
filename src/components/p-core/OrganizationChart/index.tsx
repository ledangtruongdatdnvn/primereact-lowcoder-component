import {
  arrayObjectExposingStateControl,
  hiddenPropertyView,
  jsonControl,
  NameConfig,
  NameConfigHidden,
  Section,
  toJSONObject,
  UICompBuilder,
  withExposingConfigs,
} from 'lowcoder-sdk';
import { OrganizationChart } from 'primereact/organizationchart';

export const defStaticProps = {};

export const defValue = [
  {
    label: 'Argentina',
    expanded: true,
    children: [
      {
        label: 'Argentina',
        expanded: true,
        children: [
          {
            label: 'Argentina',
          },
          {
            label: 'Croatia',
          },
        ],
      },
      {
        label: 'France',
        expanded: true,
        children: [
          {
            label: 'France',
          },
          {
            label: 'Morocco',
          },
        ],
      },
    ],
  },
];

let OrganizationChartCompBase = (function () {
  const childrenMap = {
    staticProps: jsonControl(toJSONObject, defStaticProps),
    value: arrayObjectExposingStateControl('value', defValue),
  };

  return new UICompBuilder(childrenMap, (props: any) => {
    return <OrganizationChart value={props.value.value} />;
  })
    .setPropertyViewFn((children: any) => {
      return (
        <>
          <Section name="Basic">
            {children.staticProps.propertyView({ label: 'Static Props' })}
            {children.value.propertyView({ label: 'Value' })}
          </Section>
          <Section name="Interaction">{hiddenPropertyView(children)}</Section>

          <Section name="Description">
            <ol className="text-sm p-0 m-0 mx-3">
              <li>Static Props area should contain only static props of Primereact OrganizationChart.</li>
              <li>
                <a href="https://primereact.org/selectbutton/" target="_blank">
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
export const exposingConfigs = [new NameConfig('staticProps'), new NameConfig('value'), NameConfigHidden];

export default withExposingConfigs(OrganizationChartCompBase, exposingConfigs);
