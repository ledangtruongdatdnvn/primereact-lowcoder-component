import {
  booleanExposingStateControl,
  eventHandlerControl,
  hiddenPropertyView,
  jsonControl,
  NameConfig,
  NameConfigHidden,
  Section,
  toJSONObject,
  UICompBuilder,
  withExposingConfigs,
} from 'lowcoder-sdk';
import { InputSwitch } from 'primereact/inputswitch';

const defStaticProps = {
  tooltip: 'Switch me!',
};
const defChecked = true;

let InputSwitchCompBase = (function () {
  const childrenMap = {
    staticProps: jsonControl(toJSONObject, defStaticProps),
    checked: booleanExposingStateControl('checked', defChecked),
    onEvent: eventHandlerControl([
      {
        label: 'onChange',
        value: 'change',
        description: 'Triggers when Input Switch is changed.',
      },
    ]),
  };

  return new UICompBuilder(childrenMap, (props: any) => {
    const handleChange = (e: any) => {
      props.checked.onChange(e.target.value);
      props.onEvent('change');
    };

    return (
      <div style={{ padding: '5px' }}>
        <InputSwitch {...props.staticProps} checked={props.checked.value} onChange={handleChange}></InputSwitch>
      </div>
    );
  })
    .setPropertyViewFn((children: any) => {
      return (
        <>
          <Section name="Basic">
            {children.staticProps.propertyView({ label: 'Static Props' })}
            {children.checked.propertyView({ label: 'Checked' })}
          </Section>
          <Section name="Interaction">{hiddenPropertyView(children)}</Section>
          <Section name="Event">{children.onEvent.getPropertyView()}</Section>
          <Section name="Description">
            <ol className="text-sm p-0 m-0 mx-3">
              <li>Static Props area should contain only static props of Primereact InputSwitch.</li>
              <li>
                <a href="https://primereact.org/inputswitch/" target="_blank">
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
const exposingConfigs = [new NameConfig('staticProps'), new NameConfig('checked'), NameConfigHidden];
export default withExposingConfigs(InputSwitchCompBase, exposingConfigs);
