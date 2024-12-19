import {
  BooleanStateControl,
  eventHandlerControl,
  hiddenPropertyView,
  jsonControl,
  NameConfig,
  NameConfigHidden,
  Section,
  toJSONObject,
  UICompBuilder,
  withDefault,
  withExposingConfigs,
} from 'lowcoder-sdk';
import { Button } from 'primereact/button';

export const defStaticProps = {
  label: 'button',
  raised: false,
  tooltip: 'tooltip',
  icon: 'pi pi-cog',
  iconPos: 'left',
  size: 'small',
  badge: '',
  rounded: false,
  severity: 'success',
  style: {
    width: '100%',
  },
};

let ButtonCompBase = (function () {
  const childrenMap = {
    staticProps: jsonControl(toJSONObject, defStaticProps),
    visible: withDefault(BooleanStateControl, 'true'),
    loading: withDefault(BooleanStateControl, 'false'),
    disabled: withDefault(BooleanStateControl, 'false'),
    onEvent: eventHandlerControl([
      {
        label: 'onClick',
        value: 'click',
        description: 'Triggers when Button is clicked.',
      },
    ]),
  };

  return new UICompBuilder(childrenMap, (props: any) => {
    const handleClick = () => {
      props.onEvent('click');
    };

    return (
      <div style={{ padding: '5px' }}>
        <Button
          {...props.staticProps}
          disabled={props.disabled.value}
          loading={props.loading.value}
          visible={props.visible.value}
          onClick={handleClick}
        ></Button>
      </div>
    );
  })
    .setPropertyViewFn((children: any) => {
      return (
        <>
          <Section name="Props">
            {children.staticProps.propertyView({ label: 'Static Props' })}
            {children.visible.propertyView({ label: 'Visible' })}
            {children.loading.propertyView({ label: 'Loading' })}
            {children.disabled.propertyView({ label: 'Disabled' })}
          </Section>
          <Section name="Interaction">{hiddenPropertyView(children)}</Section>
          <Section name="Event">{children.onEvent.getPropertyView()}</Section>
          <Section name="Description">
            <ol className="text-sm p-0 m-0 mx-3">
              <li>Static Props area should contain only static props of Primereact Button.</li>
              <li>
                <a href="https://primereact.org/button/" target="_blank">
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

const exposingConfigs = [
  new NameConfig('staticProps'),
  new NameConfig('visible'),
  new NameConfig('loading'),
  new NameConfig('disabled'),
  NameConfigHidden,
];

export default withExposingConfigs(ButtonCompBase, exposingConfigs);
