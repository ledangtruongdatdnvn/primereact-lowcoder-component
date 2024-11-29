import { BooleanStateControl, Section, stringExposingStateControl, UICompBuilder, withDefault, withExposingConfigs } from 'lowcoder-sdk';
import {useEffect} from "react";

let InternalStyleCompBase = (function () {
  const childrenMap = {
    useInternalStyle: withDefault(BooleanStateControl, 'true'),
    theme: stringExposingStateControl('theme', 'light'),
  };

  return new UICompBuilder(childrenMap, (props: { useInternalStyle: any; theme: any }) => {
    useEffect(() => {
      if (!props.useInternalStyle.value) return;
      const styleSheet = document.createElement("style");
      styleSheet.id = 'ioc-theme-css'
      document.head.appendChild(styleSheet)
      styleSheet.textContent = `
    @import url('https://cdn.jsdelivr.net/npm/@vietdanh1899/ioc@latest/styles.css');
    @import url('https://cdn.jsdelivr.net/npm/@vietdanh1899/ioc@latest/theme/ioc-${(props.theme.value === 'lara-light-blue' || props.theme.value === 'ioc-light' || props.theme.value === 'light') ? 'light' : 'dark'}/theme.css');
`;
      return () => {
        document.head.removeChild(styleSheet);
      }
    }, [props.theme.value, props.useInternalStyle.value]);
    return (<>
    </>);
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
