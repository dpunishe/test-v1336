import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, List, Select, Spin } from 'antd';
import { setListDataDefault, setListDataUi } from '../reducers/reducer';
import { getBrigades } from '../axios/api';
import './ListComponent.css';
import { useSelector } from 'react-redux';

const { Option } = Select;

interface Position {
  field: string;
  cluster: number;
  well: number;
}

interface Department {
  id: number;
}

export interface Data {
  id: number;
  brigade_name: string;
  connectionStateId: number;
  department: Department;
  position: Position;
}

interface RootState {
  brigades: { listDataUi: Data[]; listDataDefault: Data[]; }
}

const ListComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { listDataUi, listDataDefault } = useSelector((state: RootState) => state.brigades)
  const [filterByDepID, setFilterByDepID] = useState<string>('');
  const [filterByConnection, setFilterByConnection] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const data = await getBrigades();
    dispatch(setListDataDefault(data));
    dispatch(setListDataUi(data));
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (filterByConnection && filterByDepID) {
      dispatch(setListDataUi(listDataDefault.filter(item => item.department.id === Number(filterByDepID) && item.connectionStateId === Number(filterByConnection))));
      return;
    }
    if (filterByConnection) dispatch(setListDataUi(listDataDefault.filter(item => item.connectionStateId === Number(filterByConnection))));
    else dispatch(setListDataUi(listDataDefault.filter(item => item.department.id === Number(filterByDepID))));
  }, [dispatch, filterByConnection, filterByDepID, listDataDefault]);

  const handleDepIDChange = (value: string | null) => {
    setFilterByDepID(value ?? '');
  };

  const handleConnectionChange = (value: string | null) => {
    setFilterByConnection(value ?? '');
  };

  return (
    <Spin spinning={loading}>
      <div>
        <div className="list-component filters">
          <p>Соединение:</p>
          <Select className='select' value={filterByConnection} onChange={handleConnectionChange}>
            <Option value={'1'}>В норме</Option>
            <Option value={'0'}>Нет связи</Option>
          </Select>
          <p>Департамент:</p>
          <Select className='select' value={filterByDepID} onChange={handleDepIDChange}>
            <Option value={'0'}>Лукойл </Option>
            <Option value={'1'}>Роснефть </Option>
            <Option value={'2'}>Газпром нефть </Option>
          </Select>
        </div>
        <List
          className="list-component"
          bordered
          dataSource={listDataUi}
          grid={{ gutter: 16, column: 3 }}
          renderItem={({connectionStateId, department, brigade_name, position }) => (
            <List.Item>
              <Card
                className='card'
                title={brigade_name}
                extra={<div className={(connectionStateId === 1) ? 'connection on' : 'connection off'}></div>}
                size="small"
              >
                <h4>{(department.id === 0) ? 'Лукойл' : null}
                  {(department.id === 1) ? 'Роснефть' : null}
                  {(department.id === 2) ? 'Газпром нефть' : null}
                </h4>
                <p>Состояние соединения: {(connectionStateId === 1) ? 'В норме' : 'Нет связи'}</p>
                <p>Кластер: {position.cluster}</p>
                <p>Поле: {position.field}</p>
                <p>Скважина: {position.well}</p>
              </Card>
            </List.Item>
          )}
        />
      </div>
    </Spin>
  );
}

export default ListComponent;