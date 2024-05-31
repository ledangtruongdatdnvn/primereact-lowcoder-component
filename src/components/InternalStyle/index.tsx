import { BooleanStateControl, Section, stringExposingStateControl, UICompBuilder, withDefault, withExposingConfigs } from 'lowcoder-sdk';
import { LaraDarkBlue } from './lara-dark-blue';
import { LaraLightBlue } from './lara-light-blue';
let InternalStyleCompBase = (function () {
  const childrenMap = {
    useInternalStyle: withDefault(BooleanStateControl, 'true'),
    theme: stringExposingStateControl('theme', 'lara-light-blue'),
  };

  return new UICompBuilder(childrenMap, (props: { useInternalStyle: any; theme: any }) => {
    return (
      <>
        {props.useInternalStyle.value && props.theme.value === 'lara-light-blue' && <LaraLightBlue />}
        {props.useInternalStyle.value && props.theme.value === 'lara-dark-blue' && <LaraDarkBlue />}
      </>
    );
  })
    .setPropertyViewFn((children: any) => {
      return (
        <>
          <Section name='Basic'>
            {children.useInternalStyle.propertyView({ label: 'Internal Style' })}
            {children.theme.propertyView({ label: 'Theme' })}
          </Section>
          <Section name='Description'>
            <ol className='text-sm p-0 m-0 mx-3'>
              <li>Using this component for adding internal style to Primereact Component.</li>
            </ol>
          </Section>
        </>
      );
    })
    .build();
})();

export default withExposingConfigs(InternalStyleCompBase, []);
