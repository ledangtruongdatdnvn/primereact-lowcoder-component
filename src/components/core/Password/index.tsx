import { eventHandlerControl, jsonControl, NameConfig, Section, stringExposingStateControl, toJSONObject, UICompBuilder, withExposingConfigs } from 'lowcoder-sdk';
import { Password } from 'primereact/password';

const defStaticProps = {
  tooltip: 'Enter a password',
  inputStyle: {
    width: '100%',
  },
  style: {
    width: '100%',
  },
};
const defValue = '';

let PasswordCompBase = (function () {
  const childrenMap = {
    staticProps: jsonControl(toJSONObject, defStaticProps),
    value: stringExposingStateControl('value', defValue),
    onEvent: eventHandlerControl([
      {
        label: 'onChange',
        value: 'change',
        description: 'Triggers when Password is changed.',
      },
    ]),
  };

  return new UICompBuilder(childrenMap, (props: any) => {
    const handleChange = (e: any) => {
      props.value.onChange(e.target.value);
      props.onEvent('change');
    };

    return (
      <div style={{ padding: '5px' }}>
        <Password {...props.staticProps} value={props.value.value} onChange={handleChange}></Password>
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
              <li>Static Props area should contain only static props of Primereact Password.</li>
              <li>
                <a href='https://primereact.org/password/' target='_blank'>
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
export default withExposingConfigs(PasswordCompBase, exposingConfigs);
