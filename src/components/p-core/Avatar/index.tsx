import {
  hiddenPropertyView,
  jsonControl,
  NameConfig,
  NameConfigHidden,
  Section,
  toJSONObject,
  UICompBuilder,
  withExposingConfigs,
} from 'lowcoder-sdk';
import { Avatar } from 'primereact/avatar';

export const defStaticProps = {
  image:
    'https://scontent.fdad1-1.fna.fbcdn.net/v/t39.30808-6/299013134_897763574522042_6641937821568082708_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGN9xYijIv2oFZyD1phr52jlwCZlV7W3x-XAJmVXtbfH-tOB7F1HSlR17dKCiaYrgc8szc-zP-rwb2lwepd69kc&_nc_ohc=Cb8JpmuAj_MQ7kNvgG1qYtj&_nc_ht=scontent.fdad1-1.fna&_nc_gid=Ap7MAjFWGqoWB77CAZvOuAs&oh=00_AYBX0Ec0d7z_bgyzTqCpTrrsbIqVGSnaDWgQvTrKk-Y0gQ&oe=66F866C3',
  size: 'large',
  shape: 'circle',
};

let AvatarCompBase = (function () {
  const childrenMap = {
    staticProps: jsonControl(toJSONObject, defStaticProps),
  };

  return new UICompBuilder(childrenMap, (props: any) => {
    return <Avatar {...props.staticProps} />;
  })
    .setPropertyViewFn((children: any) => {
      return (
        <>
          <Section name="Basic">{children.staticProps.propertyView({ label: 'Static Props' })}</Section>
          <Section name="Interaction">{hiddenPropertyView(children)}</Section>

          <Section name="Description">
            <ol className="text-sm p-0 m-0 mx-3">
              <li>Static Props area should contain only static props of Primereact Avatar.</li>
              <li>
                <a href="https://primereact.org/avatar/" target="_blank">
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
export const exposingConfigs = [new NameConfig('staticProps'), NameConfigHidden];

export default withExposingConfigs(AvatarCompBase, exposingConfigs);
