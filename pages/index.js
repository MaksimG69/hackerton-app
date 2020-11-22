import { Button, Layout, Page, Card, Stack, Select, TextField, CalloutCard, SettingToggle, TextStyle, Frame } from '@shopify/polaris';
import { TitleBar } from '@shopify/app-bridge-react';
import store from 'store-js';

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

class Index extends React.Component {
  state = {
    enabled: false,
    postion: 'today',
    title: 'Estimated Shipping',
    subtitle: 'to {country}',
    freeShippingText: 'Free Shipping',
    currencySymbol: '€',
    textHex: '#000000',
    backgroundHex: '#ffffff',
  };
  render() {
    const contentStatus = this.state.enabled ? 'Disable' : 'Enable';
    const textStatus = this.state.enabled ? 'enabled' : 'disabled';

    const options = [
      {label: 'Above add to cart', value: 'today'},
      {label: 'Below add to cart', value: 'yesterday'},
    ];

    const handleSelectChange = (selected) => {
      this.setState({ postion: selected})
    }

    const settingsContent = this.state.enabled ? (
      <Frame>
        <Layout.AnnotatedSection
          title="Settings"
          description="Configure Shipping Price"
          >
          <Card>
            <Card.Section>
              <Stack alignment="fill" vertical="true">
                <Stack.Item>
                  <Select
                      label="Widget Position" options={options}
                      value={this.state.postion}
                      onChange={handleSelectChange}
                  />
                </Stack.Item>
                <Stack.Item>
                  <TextField label="Title" placeholder="Estimated Shipping" value={this.state.title} onChange={(change) => this.setState({title: change})} />
                </Stack.Item>
                <Stack.Item>
                  <TextField label="Subtitle pattern" placeholder="to {country}" value={this.state.subtitle} onChange={(change) => this.setState({subtitle: change})} />
                </Stack.Item>
                <Stack.Item>
                  <TextField label="Free shipping text" placeholder="Free Shipping" value={this.state.freeShippingText} onChange={(change) => this.setState({freeShippingText: change})} />
                </Stack.Item>
                <Stack.Item>
                  <TextField label="Display Currency symbol or design" placeholder="€" value={this.state.currencySymbol} onChange={(change) => this.setState({currencySymbol: change})} />
                </Stack.Item>
              </Stack>
            </Card.Section>
          </Card>
        </Layout.AnnotatedSection>
        <Layout.AnnotatedSection
          title="Custom design"
          description="Customize the look of the widget"
          >
          <Card>
            <Card.Section>
              <Stack alignment="fill" vertical="true">
                <Stack.Item>
                  <TextField label="Text Color (hex code)" placeholder="€" value={this.state.textHex} onChange={(change) => this.setState({textHex: change})} />
                </Stack.Item>
                <Stack.Item>
                  <TextField label="Background Color (hex code)" placeholder="€" value={this.state.backgroundHex} onChange={(change) => this.setState({backgroundHex: change})} />
                </Stack.Item>
              </Stack>
            </Card.Section>
          </Card>
        </Layout.AnnotatedSection>
        <Layout.Section>
          <CalloutCard
          title="Rate Us"
          illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
          primaryAction={{
            content: 'Click here to rate',
            url: 'https://www.shopify.com',
          }}
          >
            <p>Rate your Experience with our App</p>
          </CalloutCard>
        </Layout.Section>
      </Frame>
    ) : null;

    return (
      <Page>
        <TitleBar
          title="Settings"
          primaryAction={{
          content: 'Save',
          onAction: () => this.setState({ enabled: true }),
        }} />
        <Layout.AnnotatedSection
          title="Activate Shipping Price"
          description="Enable or Disable Shipping Price on your Store"
        >
                
          <SettingToggle
          action={{
              content: contentStatus,
              onAction: () => this.setState({ enabled: !this.state.enabled }),
          }}
          enabled={this.state.enabled}
          >
            App is currently {' '}
            <TextStyle variation="strong">{textStatus}</TextStyle>
          </SettingToggle>
        </Layout.AnnotatedSection>
        {settingsContent}
      </Page>
    );
  }

  handleSelection = (resources) => {
    const idsFromResources = resources.selection.map((product) => product.id);
    this.setState({ open: false });
    store.set('ids', idsFromResources);
  };
}

export default Index;
