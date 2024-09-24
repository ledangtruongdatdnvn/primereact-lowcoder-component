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
import { ProgressBar } from 'primereact/progressbar';

export const defStaticProps = {
  value: 50,
};

let ProgressBarCompBase = (function () {
  const childrenMap = {
    staticProps: jsonControl(toJSONObject, defStaticProps),
  };

  return new UICompBuilder(childrenMap, (props: any) => {
    return <ProgressBar {...props.staticProps} />;
  })
    .setPropertyViewFn((children: any) => {
      return (
        <>
          <Section name='Basic'>
            {children.staticProps.propertyView({ label: 'Static Props' })}
          </Section>
          <Section name='Interaction'>{hiddenPropertyView(children)}</Section>

          <Section name='Description'>
            <ol className='text-sm p-0 m-0 mx-3'>
              <li>Static Props area should contain only static props of Primereact ProgressBar.</li>
              <li>
                <a href='https://primereact.org/progressbar/' target='_blank'>
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
export const exposingConfigs = [new NameConfig('staticProps'), NameConfigHidden];

export default withExposingConfigs(ProgressBarCompBase, exposingConfigs);
