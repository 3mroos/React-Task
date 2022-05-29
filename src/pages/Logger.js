import { TextField, FormControl, Select, MenuItem, InputLabel, makeStyles } from '@material-ui/core'
import { React, useEffect, useState } from 'react'
import Loader from '../components/Loader'
import Datatable from '../components/Datatable'
import Search from '../components/search'


const useStyles = makeStyles({
  input_txt: {
    width: '100%',
    border: 'solid 1px #d9dcde',
    borderRadius: 4,
    padding: 5,
    outline: 'none',
    height: 20,
  },
  select: {
    width: '100%',
    border: 'solid 1px #d9dcde',
    borderRadius: 4,
    padding: 5,
    outline: 'none',
    height: 30,
  }
})

export default function Logger() {
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(true);

  const [data, setData] = useState(null);

  const onSearch = (obj) => {
    setData(obj);
    tableRefresh();
  }

 //TODO: Reverse sort methods must be introduced
 //TODO: sort parameters must passed as props not hard coded
  const onSort = (sortBy) => {
    if (sortBy == 1) {
      sortByNums('logId');
    }
    if (sortBy == 3) {
      sortByNums('applicationId');
    }
    if (sortBy == 2) {
      sortByString('applicationType');
    }
    if (sortBy == 4) {
      sortByString('actionType');
    }
    if (sortBy == 6) {
      sortByString('creationTimestamp');
    }
  }

  const sortByNums = (sortTitle) => {
    data.sort((a, b) => {
      return a[sortTitle] - b[sortTitle];
    });
    tableRefresh();
  }

  const sortByString = (sortTitle) => {
    data.sort((a, b) => {
      if (a[sortTitle] < b[sortTitle]) {
        return -1;
      }
      if (a[sortTitle] > b[sortTitle]) {
        return 1;
      }
      return 0;
    });
    tableRefresh();
  }
  const sortByDate = (sortTitle) => {
    data.sort((a, b) => {
      let da = new Date(a[sortTitle]),
        db = new Date(b[sortTitle]);
      return da - db;
    });
    tableRefresh();
  }

  const tableRefresh = () => {
    setTableLoading(true);
    setTimeout(() => {
      setTableLoading(false);
    }, 100);
  }

  useEffect(() => {
    setLoading(true);
    fetch('https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f')
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        setData(data.result.auditLog)
        setTableLoading(false);
      })
  }, []);

  return (
    <div>
      {
        loading ? <Loader></Loader> : null
      }
      {data ? (<Search data={data} onSearch={onSearch}></Search>) : null}
      {!tableLoading ? (<Datatable data={data} onSort={onSort}></Datatable>) : null}
    </div>
  )


}
