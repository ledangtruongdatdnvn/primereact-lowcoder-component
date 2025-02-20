import {
  booleanExposingStateControl,
  eventHandlerControl,
  hiddenPropertyView,
  jsonControl,
  jsonObjectExposingStateControl,
  jsonValueExposingStateControl,
  NameConfig,
  NameConfigHidden,
  Section,
  stringExposingStateControl,
  toJSONObject,
  UICompBuilder,
  withExposingConfigs,
} from 'lowcoder-sdk';
import LabelWrapper from '../../../components/common/LabelWrapper';
import { Calendar, CalendarProps } from 'primereact/calendar';
import React, { useEffect, useMemo, useRef } from 'react';
import { isDate, isFullArray, isString } from 'is-what';
import { classNames } from 'primereact/utils';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useDeepCompareEffect } from 'use-deep-compare';

dayjs.extend(customParseFormat);

type AppDate = Date | (Date | null)[] | null | any;

type CalendarCompProps = {
  staticProps: CalendarProps & { showClear?: boolean; iconClass?: string; alterDateFormat?: string[] };
  value: any;
  label: any;
  required: any;
  error: any;
  caption: any;
  showCaption: any;
  defaultValue: any;
};

export const defStaticProps = {
  showClear: true,
  showIcon: true,
  placeholder: 'DD/MM/YYYY - DD/MM/YYYY',
  selectionMode: 'range',
  hideOnRangeSelection: true,
  dateFormat: 'DD/MM/YYYY',
  style: {
    width: '100%',
  },
};

const dateFormatRegex = new RegExp('[^0-9a-zA-Z.]', 'g');
const trimDateString = (date: string) => date.replaceAll(dateFormatRegex, '');

let CalendarCompBase = (function () {
  const childrenMap = {
    staticProps: jsonControl(toJSONObject, defStaticProps),
    value: jsonObjectExposingStateControl('value', null),
    defaultValue: jsonValueExposingStateControl('defaultValue', ['02/11/2000', '02/12/2000']),
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

  return new UICompBuilder(childrenMap, (props: CalendarCompProps) => {
    const [value, setValue] = React.useState<AppDate>(props.value ?? null);
    const inputRef = useRef<HTMLInputElement>(null);
    const calendarRef = useRef<Calendar>(null);

    const {
      selectionMode,
      showClear,
      disabled,
      iconClass,
      showIcon,
      dateFormat = 'DD/MM/YYYY',
      style,
      ...staticProps
    } = props.staticProps;

    useDeepCompareEffect(() => {
      const newDate = isFullArray(props.defaultValue.value)
        ? props.defaultValue.value.map((i: string) => dayjs(i, dateFormat).toDate())
        : dayjs(props.defaultValue.value, dateFormat).toDate();
      props.value.onChange?.(newDate);
      setValue(newDate);
    }, [props.defaultValue?.value]);

    const handleClear = () => {
      setValue(null);
      props.value.onChange?.(null);
    };

    const updateInput = () => {
      inputRef.current?.blur();
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    };

    const hideOverlay = () => {
      calendarRef.current?.hide();
    };

    const handleChange = (event: any) => {
      const value = event.value;
      setValue(value);
      props.value.onChange?.(value);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && calendarRef.current.getOverlay()) {
        if (
          !calendarRef.current.getOverlay()?.contains(event.target as Node) &&
          !calendarRef.current.getElement()?.contains(event.target as Node)
        ) {
          calendarRef.current.hide();
        }
      }
    };

    useEffect(() => {
      document.addEventListener('mouseup', handleClickOutside);
      return () => {
        document.removeEventListener('mouseup', handleClickOutside);
      };
    }, []);

    return (
      <LabelWrapper
        label={props.label.value}
        required={props.required.value}
        error={props.error.value}
        caption={props.caption.value}
        showCaption={props.showCaption.value}
      >
        <span
          style={style}
          className={classNames({
            'p-input-icon-left': iconClass && iconClass?.length > 0,
            'p-input-icon-right': showClear && value,
          })}
        >
          <Calendar
            ref={calendarRef}
            inputRef={inputRef}
            selectionMode={selectionMode}
            disabled={disabled}
            showIcon={showIcon}
            style={style}
            {...staticProps}
            value={value}
            onChange={handleChange}
            parseDateTime={(text): any => {
              const date = dayjs(trimDateString(text), trimDateString(dateFormat), true);
              if (date.isValid()) return date.toDate();
              else return null;
            }}
            invalid={props.error?.value?.length > 0}
            formatDateTime={(value) => dayjs(value).format(dateFormat)}
          ></Calendar>
          {showClear && value && !disabled && (
            <i
              className="pi pi-times cursor-pointer"
              style={{ right: showIcon ? `3.75rem` : '0.75rem' }}
              onClick={handleClear}
            ></i>
          )}
        </span>
      </LabelWrapper>
    );
  })
    .setPropertyViewFn((children: any) => {
      return (
        <>
          <Section name="Basic">
            {children.staticProps.propertyView({ label: 'Static Props' })}
            {children.defaultValue.propertyView({ label: 'Default Value' })}
          </Section>
          <Section name="Interaction">{hiddenPropertyView(children)}</Section>
          <Section name="Form">
            {children.label.propertyView({ label: 'Label' })}
            {children.error.propertyView({ label: 'Error' })}
            {children.caption.propertyView({ label: 'Caption' })}
            {children.showCaption.propertyView({ label: 'Show caption' })}
            {children.required.propertyView({ label: 'Required' })}
          </Section>
          <Section name="Event">{children.onEvent.getPropertyView()}</Section>
          <Section name="Description">
            <ol className="text-sm p-0 m-0 mx-3">
              <li>Static Props area should contain only static props of Primereact Calendar.</li>
              <li>
                <a href="https://primereact.org/calendar/" target="_blank">
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
  new NameConfig('value'),
  new NameConfig('label'),
  new NameConfig('error'),
  new NameConfig('caption'),
  new NameConfig('showCaption'),
  new NameConfig('required'),
  NameConfigHidden,
];
export default withExposingConfigs(CalendarCompBase, exposingConfigs);
