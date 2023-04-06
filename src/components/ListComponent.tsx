import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, List, Select} from 'antd';
import { filterItemsByConnection, filterItemsByDepartment } from '../reducers/reducer';
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

interface Data {
  id: number;
  brigadeName: string;
  connectionStateId: number;
  department: Department;
  position: Position;
}

const ListComponent: React.FC = () => {
  const [listData, setListData] = useState<Data[]>([]);
  const dispatch = useDispatch();
  const [filterByDepID, setFilterByDepID] = useState('');
  const [filterByConnection, setFilterByConnection] = useState('');

  const fetchData = useCallback(async () => {
    const data = await getBrigades();
    setListData(data);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDepIDChange = (value: string | null) => {
    setFilterByDepID(value ?? '');
    dispatch(filterItemsByDepartment(value === '' ? null : Number(value)));
  };

  const handleConnectionChange = (value: string | null) => {
    setFilterByConnection(value ?? '');
    dispatch(filterItemsByConnection(value === '' ? null : Number(value)));
  };

  return (
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
        dataSource={listData}
        grid={{ gutter: 16, column: 3 }}
        renderItem={({connectionStateId, department, id, position }) => (
          <List.Item>
            <Card
              className='card'
              title={`Бригада №${id}`}
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
  );
}

export default ListComponent;