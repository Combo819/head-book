import {
  Layout,
  Button,
  Avatar,
  Popover,
  Tooltip,
  Dropdown,
  Menu,
  Space,
} from 'antd';
import React, { useState, useEffect } from 'react';
import {
  PlusOutlined,
  UserOutlined,
  QuestionCircleOutlined,
  UploadOutlined,
  MenuOutlined,
  CloudDownloadOutlined,
} from '@ant-design/icons';
import { SavePostModal } from '../SavePostModal';
import { getAccountProfileApi } from '../../Api';
import styles from './AppHeader.module.scss';
import { AccountModal } from '../AccountModal';
import { IUser } from '../../types';
import { RootState } from '../../Store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { accountCreators } from '../../Store';
import { MonitorPopover } from '../MonitorPopover';
import { showMonitorIntro } from '../MonitorIntro';
import { ImportModal } from '../ImportModal/ImportModal';
import { ExportModal } from '../ExportModal/ExportModal';
import { Link } from 'react-router-dom';

const { Header } = Layout;

function AppHeader() {
  const [isSaveModalVisible, setSaveModalVisible] = useState(false);
  const [isAccountModalVisible, setIsAccountModalVisible] = useState(false);
  const [importModalVisible, setImportModalVisible] = useState(false);
  const [exportModalVisible, setExportModalVisible] = useState(false);
  const { account } = useSelector((state: RootState) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    getAccountProfileApi()
      .then((res) => {
        const user: IUser = res.data.result;
        dispatch(accountCreators.setAccount(user));
      })
      .catch((err) => {});
  }, []);

  const buttons = [
    <div>
      <Link to='/'>
      <img className={styles['icon']} src="./letter-h.png" alt="" />
      </Link>
    </div>,

    <div className={styles['import']}>
      <Button
        icon={<UploadOutlined className={styles['save-icon']}></UploadOutlined>}
        type="link"
        onClick={() => {
          setImportModalVisible(true);
        }}
      >
        Import
      </Button>
    </div>,

  ];

  return (
    <>
      <Header className={styles['app-header']}>
        <Dropdown
          className={styles['dropdown']}
          overlay={
            <Menu>
              {buttons.map((button) => {
                return <Menu.Item>{button}</Menu.Item>;
              })}
            </Menu>
          }
          trigger={['click']}
        >
          <MenuOutlined />
        </Dropdown>
        <Space className={styles['space']}>{buttons}</Space>

        <div
          className={styles['account']}
          onClick={() => setIsAccountModalVisible(true)}
        >
          <Avatar icon={<UserOutlined className={styles['icon']} />} />
        </div>
      </Header>
      <SavePostModal
        visible={isSaveModalVisible}
        closeModal={() => {
          setSaveModalVisible(false);
        }}
      ></SavePostModal>
      <AccountModal
        setVisible={(value: boolean) => {
          setIsAccountModalVisible(value);
        }}
        account={account}
        visible={isAccountModalVisible}
      />
      <ImportModal
        importModalVisible={importModalVisible}
        setImportModalVisible={setImportModalVisible}
      ></ImportModal>
      <ExportModal
        visible={exportModalVisible}
        setVisible={setExportModalVisible}
      ></ExportModal>
    </>
  );
}

export { AppHeader };
