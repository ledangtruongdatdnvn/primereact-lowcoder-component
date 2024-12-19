import {
  jsonControl,
  NameConfig,
  NameConfigHidden,
  Section,
  StringControl,
  toJSONObject,
  toJSONObjectArray,
  UICompBuilder,
  withDefault,
  withExposingConfigs,
} from 'lowcoder-sdk';
import { Timeline } from 'primereact/timeline';

const defStaticProps = { align: 'left' };
const defValue = [
  { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart' },
  {
    status: 'Processing',
    date: '15/10/2020 14:00',
    icon: 'pi pi-cog',
  },
  { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart' },
  {
    status: 'Delivered',
    date: '16/10/2020 10:00',
    icon: 'pi pi-check',
  },
];

let TimelineCompBase = (function () {
  const childrenMap = {
    staticProps: jsonControl(toJSONObject, defStaticProps),
    value: jsonControl(toJSONObjectArray, defValue),
    content: withDefault(StringControl, 'status'),
    subContent: withDefault(StringControl, 'date'),
    icon: withDefault(StringControl, 'icon'),
  };

  return new UICompBuilder(childrenMap, (props: any) => {
    return (
      <Timeline
        {...props.staticProps}
        value={props.value}
        content={(item: any) => (
          <div style={{ color: item.color }}>
            {item[props.content]}
            <div className="text-xs">{item[props.subContent]}</div>
          </div>
        )}
        // marker={(item: any) => (
        //   <span className='flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle z-1 shadow-1' style={{ backgroundColor: item.color }}>
        //     <i className={item[props.icon]}></i>
        //   </span>
        // )}
      ></Timeline>
    );
  })
    .setPropertyViewFn((children: any) => {
      return (
        <>
          <Section name="Basic">
            {children.staticProps.propertyView({ label: 'Static Props' })}
            {children.value.propertyView({ label: 'Value' })}
            {children.content.propertyView({ label: 'Title' })}
            {children.subContent.propertyView({ label: 'Sub-Title' })}
            {children.icon.propertyView({ label: 'Icon' })}
          </Section>
          <Section name="Description">
            <ol className="text-sm p-0 m-0 mx-3">
              <li>Static Props area should contain only static props of Primereact Timeline.</li>
              <li>
                <a href="https://primereact.org/timeline/" target="_blank">
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
  new NameConfig('value'),
  new NameConfig('content'),
  new NameConfig('subContent'),
  new NameConfig('icon'),
  NameConfigHidden,
];
export default withExposingConfigs(TimelineCompBase, exposingConfigs);
