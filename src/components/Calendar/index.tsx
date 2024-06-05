import { eventHandlerControl, jsonControl, jsonObjectExposingStateControl, NameConfig, Section, toJSONObject, toJSONObjectArray, UICompBuilder, withExposingConfigs } from 'lowcoder-sdk';

import { Calendar } from 'primereact/calendar';

export const defStaticProps = {
  placeholder: 'Choose date(s)',
  selectionMode: 'range',
  hideOnRangeSelection: true,
  dateFormat: 'dd/mm/yy',
  style: {
    width: '100%',
  },
};
import { useRef } from 'react';

let CalendarCompBase = (function () {
  const childrenMap = {
    staticProps: jsonControl(toJSONObject, defStaticProps),
    value: jsonObjectExposingStateControl('value', {
      start: '02/11/2000',
      end: '02/12/2000',
    }),
    onEvent: eventHandlerControl([
      {
        label: 'onChange',
        value: 'change',
        description: 'Triggers when Calendar is changed.',
      },
    ]),
  };

  return new UICompBuilder(childrenMap, (props: any) => {
    const isRange = props.staticProps.selectionMode === 'range';
    const start = props.value.value.start;
    const end = props.value.value.end;
    const input = isRange ? [start ? new Date(start) : null, end ? new Date(end) : null] : start ? new Date(start) : null;
    const ref = useRef(null);
    const handleChange = (e: any) => {
      if (!isRange) {
        props.value.onChange({ start: new Date(e.value), end: null });
      } else {
        if (!start || (start && end)) {
          props.value.onChange({ start: new Date(e.value[0]), end: null });
        } else if (!end) {
          if (new Date(start).getTime() > new Date(end).getTime()) {
            props.value.onChange({ start: new Date(e.value[0]), end: start });
          } else {
            props.value.onChange({ start: start, end: new Date(e.value[0]) });
          }
          (ref.current as any)?.hide();
        }
      }

      props.onEvent('change');
    };

    return (
      <div style={{ padding: '5px' }}>
        <Calendar ref={ref} {...props.staticProps} value={input} onChange={handleChange}></Calendar>
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
              <li>Static Props area should contain only static props of Primereact Calendar.</li>
              <li>
                <a href='https://primereact.org/calendar/' target='_blank'>
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
export const exposingConfigs = [new NameConfig('staticProps'), new NameConfig('value')];
export default withExposingConfigs(CalendarCompBase, exposingConfigs);
