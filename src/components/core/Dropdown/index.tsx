import {
  booleanExposingStateControl,
  eventHandlerControl,
  hiddenPropertyView,
  jsonControl,
  jsonObjectExposingStateControl,
  migrateOldData,
  NameConfig,
  NameConfigHidden,
  Section,
  stringExposingStateControl,
  toJSONObject,
  toJSONObjectArray,
  UICompBuilder,
  withExposingConfigs,
} from 'lowcoder-sdk';
import { Dropdown, DropdownProps } from 'primereact/dropdown';
import LabelWrapper from '../../../components/common/LabelWrapper';
import { useDeepCompareEffect, useDeepCompareMemo } from 'use-deep-compare';
import _ from 'lodash';
import { IconType } from 'primereact/utils';
import { useEffect, useRef, useState } from 'react';

const defStaticProps = {
  placeholder: 'Select a City',
  optionLabel: 'name',
  style: {
    width: '100%',
  },
  showClear: true,
  filter: true,
  showFilterClear: true,
};

const defValue = { name: 'New York', code: 'NY' };

const defOptions = [
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  {
    name: 'London',
    code: 'LDN',
  },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' },
];

const FilterClearIcon: IconType<DropdownProps> = (options) => (
  <span {...(options.iconProps as any)} className="p-dropdown-filter-icon">
    <div className="flex gap-2">
      <i className="pi pi-times cursor-pointer"></i>
    </div>
  </span>
);

const childrenMap = {
  staticProps: jsonControl(toJSONObject, defStaticProps),
  defaultValue: jsonObjectExposingStateControl('defaultValue', defValue),
  value: jsonObjectExposingStateControl('value', defValue),
  label: stringExposingStateControl('label', ''),
  error: stringExposingStateControl('error', ''),
  caption: stringExposingStateControl('caption', ''),
  showCaption: booleanExposingStateControl('showCaption', false),
  required: booleanExposingStateControl('required', false),
  options: jsonControl(toJSONObjectArray, defOptions),
  onEvent: eventHandlerControl([
    {
      label: 'onChange',
      value: 'change',
      description: 'Triggers when Dropdown is selected.',
    },
  ]),
};

const DropdownView = (props: any) => {
  const handleChange = (e: any) => {
    props.value.onChange(e.target.value);
    props.onEvent('change');
  };

  useDeepCompareEffect(() => {
    props.value.onChange?.(props.defaultValue?.value);
  }, [props.defaultValue?.value]);

  const options = useDeepCompareMemo(() => props.options, [props.options]);
  const staticProps = useDeepCompareMemo(() => props.staticProps, [props.staticProps]);

  const [filter, setFilter] = useState<string>('');
  const dropdownRef = useRef<Dropdown>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && dropdownRef.current.getOverlay()) {
      if (
        !dropdownRef.current.getOverlay()?.contains(event.target as Node) &&
        !dropdownRef.current.getElement()?.contains(event.target as Node)
      ) {
        dropdownRef.current.hide();
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
      <Dropdown
        ref={dropdownRef}
        {..._.merge(staticProps, { style: { width: '100%' } })}
        value={props.value.value}
        options={options}
        onChange={handleChange}
        invalid={props.error.value.length > 0}
        filterIcon={filter.length > 0 ? <></> : 'pi pi-search'}
        filterClearIcon={FilterClearIcon}
        onFilter={(e) => {
          setFilter(e.filter);
        }}
      ></Dropdown>
    </LabelWrapper>
  );
};

const DropdownCompBase = new UICompBuilder(childrenMap, DropdownView)
  .setPropertyViewFn((children: any) => {
    return (
      <>
        <Section name="Basic">
          {children.staticProps.propertyView({ label: 'Static Props' })}
          {children.defaultValue.propertyView({ label: 'Default Value' })}
          {children.options.propertyView({ label: 'Options' })}
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
          <ol className="text-sm p-0 m-0 mx-4">
            <li>Static Props area should contain only static props of Primereact Dropdown.</li>
            <li>
              <a href="https://primereact.org/dropdown/" target="_blank">
                More information
              </a>
            </li>
          </ol>
        </Section>
      </>
    );
  })
  .build();

const exposingConfigs = [
  // new NameConfig('staticProps'),
  new NameConfig('value'),
  new NameConfig('options'),
  new NameConfig('label'),
  new NameConfig('error'),
  new NameConfig('caption'),
  new NameConfig('showCaption'),
  new NameConfig('required'),
  NameConfigHidden,
];

// separate defaultValue and value for old components
export function fixOldInputCompData(oldData: any) {
  if (!oldData) return oldData;
  if (Boolean(oldData.value) && !Boolean(oldData.defaultValue)) {
    const value = oldData.value;
    return {
      ...oldData,
      defaultValue: value,
      value: '',
    };
  }
  return oldData;
}

const DropDownComp = migrateOldData(DropdownCompBase, fixOldInputCompData);

export default withExposingConfigs(DropDownComp, exposingConfigs);
