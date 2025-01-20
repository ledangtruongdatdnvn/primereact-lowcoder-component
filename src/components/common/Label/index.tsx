import {
  dropdownControl,
  hiddenPropertyView,
  markdownCompCss,
  NameConfig,
  NameConfigHidden,
  Section,
  StringControl,
  stringExposingStateControl,
  TacoMarkDown,
  UICompBuilder,
  withDefault,
  withExposingConfigs,
} from 'lowcoder-sdk';
import { styled } from 'styled-components';

const TextContainer = styled.div`
  ${markdownCompCss};
`;
const defTypeOptions = [
  {
    label: 'Markdown',
    value: 'markdown',
  },
  {
    label: 'Text',
    value: 'text',
  },
] as const;

const defLabel = 'My Label';

let LabelCompBase = (function () {
  const childrenMap = {
    text: stringExposingStateControl('text', '### 👋 Hello Friends, I am <i>Dat</i> '),
    type: dropdownControl(defTypeOptions, 'markdown'),
    label: withDefault(StringControl, defLabel),
  };

  return new UICompBuilder(childrenMap, (props: { label: any; type: any; text: any }) => {
    const value = props.text.value;
    return (
      <div className="flex flex-col gap-2">
        <label>{props.label}</label>
        <TextContainer>{props.type === 'markdown' ? <TacoMarkDown>{value}</TacoMarkDown> : value}</TextContainer>
      </div>
    );
  })
    .setPropertyViewFn((children: any) => {
      return (
        <>
          <Section name="Basic">
            {children.label.propertyView({ label: 'Label' })}
            {children.type.propertyView({
              label: 'Type',
              tooltip:
                'Markdown Supports Most HTML Tags and Attributes. iframe, Script, and Other Tags Are Disabled for Security Reasons.',
              radioButton: true,
            })}
            {children.text.propertyView({ label: 'Content' })}
          </Section>
          <Section name="Interaction">{hiddenPropertyView(children)}</Section>
          <Section name="Description">
            <ol className="text-sm p-0 m-0 mx-4">
              <li>Content can be markdown or text.</li>
            </ol>
          </Section>
        </>
      );
    })
    .build();
})();

const exposingConfigs = [new NameConfig('text'), NameConfigHidden];
export default withExposingConfigs(LabelCompBase, exposingConfigs);
