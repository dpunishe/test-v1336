import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, List, Select, Spin } from 'antd';
import { setListDataDefault, setListDataUi } from '../reducers/reducer';
import { getBrigades } from '../axios/api';
import './ListComponent.css';

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
  brigades: { listDataUi: Data[]; listDataDefault: Data[] };
}

const ListComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { listDataUi, listDataDefault } = useSelector(
    (state: RootState) => state.brigades
  );
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
    const filteredData = listDataDefault.filter((item) => {
      if (filterByConnection && filterByDepID) {
        return (
          item.department.id === Number(filterByDepID) &&
          item.connectionStateId === Number(filterByConnection)
        );
      }
      if (filterByConnection) {
        return item.connectionStateId === Number(filterByConnection);
      }
      return item.department.id === Number(filterByDepID);
    });
    dispatch(setListDataUi(filteredData));
  }, [dispatch, filterByConnection, filterByDepID, listDataDefault]);

  const handleDepIDChange = (value: string | null) => {
    setFilterByDepID(value ?? '');
  };

  const handleConnectionChange = (value: string | null) => {
    setFilterByConnection(value ?? '');
  };

  const mobileGrid = { column: 2 };
  const desktopGrid = { column: 4 };
  const finalGrid = window.matchMedia('(max-width: 479px)').matches
    ? mobileGrid
    : desktopGrid;
   
  return (
    <Spin spinning={loading}>
      <div>
        <div className="list-component filters">
          <p>Соединение:</p>
          <Select
            className="select"
            value={filterByConnection}
            onChange={handleConnectionChange}
          >
            <Option value={'1'}>В норме</Option>
            <Option value={'0'}>Нет связи</Option>
          </Select>
          <p>Департамент:</p>
          <Select
            className="select"
            value={filterByDepID}
            onChange={handleDepIDChange}
          >
            <Option value={'0'}>Лукойл </Option>
            <Option value={'1'}>Роснефть </Option>
            <Option value={'2'}>Газпром нефть </Option>
          </Select>
        </div>
        <List
          className="list-component"
          dataSource={listDataUi}
          bordered
          grid={finalGrid}
          renderItem={({ connectionStateId, department, brigade_name, position }) => (
            <List.Item className="list">
              <Card
                className="card"
                title={brigade_name}
                extra={
                  <div
                    className={
                      connectionStateId === 1 ? 'connection on' : 'connection off'
                    }
                  ></div>
                }
                size="small"
              >
                <h4>
                  {department.id === 0 ? 'Лукойл' : null}
                  {department.id === 1 ? 'Роснефть' : null}
                  {department.id === 2 ? 'Газпром нефть' : null}
                </h4>
                <p><b>Состояние соединения:</b> {connectionStateId === 1 ? 'В норме' : 'Нет связи'}</p>
                <p><b>Кластер</b>: {position.cluster}</p>
                <p><b>Поле</b>: {position.field}</p>
                <p><b>Скважина</b>: {position.well}</p>
              </Card>
            </List.Item>
          )}
        />
      </div>
    </Spin>
  );
};

export default ListComponent;