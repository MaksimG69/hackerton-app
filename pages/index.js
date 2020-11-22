import { Button, Layout, Page, Card, Stack, Select, TextField } from '@shopify/polaris';
import { TitleBar } from '@shopify/app-bridge-react';
import store from 'store-js';

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

class Index extends React.Component {
  state = { open: false };
  render() {
    const emptyState = !store.get('ids');
    return (
      <Page>
        <TitleBar
          title="Settings"
          primaryAction={{
          content: 'Select products',
          onAction: () => this.setState({ open: true }),
        }} />

<Layout.AnnotatedSection
          title="Custom CSS"
          description="Configure Estimated Shipping Cost"
          >
          <Card>
            <Card.Section>
              <Stack alignment="fill">
                <Stack.Item>
                  <Select
                      label="Widget Position"
                  />
                </Stack.Item>
                <Stack.Item>
                  <TextField label="Title" />
                </Stack.Item>
                <Stack.Item>
                  <TextField label="Subtitle pattern" />
                </Stack.Item>
                <Stack.Item>
                  <TextField label="Free shipping text" />
                </Stack.Item>
                <Stack.Item>
                  <TextField label="Display Currency symbol or design" />
                </Stack.Item>
              </Stack>
            </Card.Section>
          </Card>
        </Layout.AnnotatedSection>        
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
