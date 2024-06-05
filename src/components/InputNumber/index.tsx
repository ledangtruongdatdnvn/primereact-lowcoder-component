import { NameConfig, eventHandlerControl, jsonControl, numberExposingStateControl, Section, toJSONObject, UICompBuilder, withExposingConfigs } from 'lowcoder-sdk';
import { InputNumber } from 'primereact/inputnumber';

const defStaticProps = {
  placeholder: 'Enter a number',
  min: 1,
  max: 10,
  style: {
    width: '100%',
  },
};
const defValue = 1;

let InputNumberCompBase = (function () {
  const childrenMap = {
    staticProps: jsonControl(toJSONObject, defStaticProps),
    value: numberExposingStateControl('value', defValue),
    onEvent: eventHandlerControl([
      {
        label: 'onValueChange',
        value: 'valueChange',
        description: 'Callback to invoke after validation check and value change.',
      },
    ]),
  };

  return new UICompBuilder(childrenMap, (props: any) => {
    const handleValueChange = (e: any) => {
      props.value.onChange(e.target.value);
      props.onEvent('valuechange');
    };

    return (
      <div style={{ padding: '5px' }}>
        <InputNumber {...props.staticProps} value={props.value.value} onValueChange={handleValueChange}></InputNumber>
      </div>
    );
  })
    .setPropertyViewFn((children: any) => {
      return (
        <>
          <Section name='Basic'>
            {children.staticProps.propertyView({ label: 'Static Props' })}
            {children.value.propertyView({ label: 'Value' })}
          </Section>
          <Section name='Event'>{children.onEvent.getPropertyView()}</Section>
          <Section name='Description'>
            <ol className='text-sm p-0 m-0 mx-3'>
              <li>Static Props area should contain only static props of Primereact InputNumber.</li>
              <li>
                <a href='https://primereact.org/inputnumber/' target='_blank'>
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

const exposingConfigs = [new NameConfig('staticProps'), new NameConfig('value')];
export default withExposingConfigs(InputNumberCompBase, exposingConfigs);
