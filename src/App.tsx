
import { Layout} from 'antd';
import ListComponent from './components/ListComponent';


const { Content } = Layout;

const App: React.FC = () => {

  return (
    <Layout>
      <Content>
        <ListComponent/>
      </Content>
    </Layout>
  );
};

export default App;
