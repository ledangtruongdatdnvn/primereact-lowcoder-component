import {
  eventHandlerControl,
  jsonControl,
  jsonObjectExposingStateControl,
  NameConfig,
  Section,
  toJSONObject,
  UICompBuilder,
  withExposingConfigs,
  stringExposingStateControl,
  booleanExposingStateControl,
} from 'lowcoder-sdk';
import LabelWrapper from '../../../components/common/LabelWrapper';
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

let CalendarCompBase = (function () {
  const childrenMap = {
    staticProps: jsonControl(toJSONObject, defStaticProps),
    value: jsonObjectExposingStateControl('value', {
      start: '02/11/2000',
      end: '02/12/2000',
    }),
    label: stringExposingStateControl('label', ''),
    error: stringExposingStateControl('error', ''),
    caption: stringExposingStateControl('caption', ''),
    showCaption: booleanExposingStateControl('showCaption', false),
    required: booleanExposingStateControl('required', false),
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

    const handleChange = (e: any) => {
      if (!isRange) {
        props.value.onChange({ start: new Date(e.value), end: null });
      } else {
        if (!start || (start && end)) {
          props.value.onChange({ start: new Date(e.value[0]), end: null });
        } else if (!end) {
          const firstValue = new Date(e.value[0]);
          const secondValue = new Date(e.value[1]);

          if (new Date(firstValue).getTime() < new Date(secondValue).getTime()) {
            props.value.onChange({ start: firstValue, end: secondValue });
          } else {
            props.value.onChange({ start: secondValue, end: firstValue });
          }
        }
      }

      props.onEvent('change');
    };

    return (
      <div style={{ padding: '5px' }}>
        <LabelWrapper label={props.label.value} required={props.required.value} error={props.error.value} caption={props.caption.value} showCaption={props.showCaption.value}>
          <Calendar {...props.staticProps} value={input} onChange={handleChange} invalid={props.error.value.length > 0}></Calendar>
        </LabelWrapper>
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
          <Section name='Form'>
            {children.label.propertyView({ label: 'Label' })}
            {children.error.propertyView({ label: 'Error' })}
            {children.caption.propertyView({ label: 'Caption' })}
            {children.showCaption.propertyView({ label: 'Show caption' })}
            {children.required.propertyView({ label: 'Required' })}
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
export const exposingConfigs = [
  new NameConfig('staticProps'),
  new NameConfig('value'),
  new NameConfig('label'),
  new NameConfig('error'),
  new NameConfig('caption'),
  new NameConfig('showCaption'),
  new NameConfig('required'),
];
export default withExposingConfigs(CalendarCompBase, exposingConfigs);
