import { Button, makeStyles, Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react';


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
    },
})

export default function Search({ data, onSearch }) {
    const [originalData, setOriginalData] = useState('');
    if (data) {
        if (!originalData) setOriginalData(data);
    }

    const classes = useStyles();

    const [logId, setLogId] = useState('');
    const [actionType, setActionType] = useState('');
    const [applicationType, setApplicationType] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [applicationId, setApplicationId] = useState('');


    const [searchQuery, setSearchQuery] = useState();
    const [filteredData, setFilteredData] = useState();



    const handleSearch = () => {
        let searchQuery = {
            logId,
            actionType,
            applicationType,
            dateFrom,
            dateTo,
            applicationId
        }

        //TODO: requiered fields must be handle in a nicer way than alerts
        if ((searchQuery.dateFrom && !searchQuery.dateTo) || !searchQuery.dateFrom && searchQuery.dateTo) {
            alert('Please enter the Date from and Date to fields')
            return
        }

        //TODO: searchQuery must be passed as props
        if (!searchQuery.logId && !searchQuery.actionType && !searchQuery.applicationId && !searchQuery.applicationType && !searchQuery.dateFrom && !searchQuery.dateTo) {
            searchQuery = null;
            onSearch(originalData);
            return;
        }
        setSearchQuery(searchQuery)
    }

    useEffect(() => {

        //TODO: searchQuery must be passed as props
        if (searchQuery) {
            let filtered = originalData;

            if (searchQuery.logId) {
                filtered = filtered.filter(val => {
                    if (val.logId == searchQuery.logId) {
                        return val
                    }
                })
            }
            if (searchQuery.actionType) {
                filtered = filtered.filter(val => {
                    if (val.actionType == searchQuery.actionType) {
                        return val
                    }
                })
            }
            if (searchQuery.applicationId) {
                filtered = filtered.filter(val => {
                    if (val.applicationId == searchQuery.applicationId) {
                        return val
                    }
                })
            }
            if (searchQuery.applicationType) {
                filtered = filtered.filter(val => {
                    if (val.applicationType == searchQuery.applicationType) {
                        return val
                    }
                })
            }
            if (searchQuery.dateFrom) {
                filtered = filtered.filter(val => {
                    let d1 = new Date(val.creationTimestamp.split(' ')[0]);
                    let dFrom = new Date(searchQuery.dateFrom)
                    let dTo = new Date(searchQuery.dateTo)
                    if (d1 >= dFrom && d1 <= dTo) {
                        return val
                    }
                })
            }
            onSearch(filtered)
        } else {
            // if (original.length) {
            //     setRRows(original)
            // }
        }
    }, [searchQuery])



    return (

        <div class="grid mb-20">
            <label class="gridItem">
                Employee Name
                <input type="text" className={classes.input_txt} placeholder="e.g. Admin User" onChange={e => setLogId(e.target.value)} />
            </label>
            <label class="gridItem">
                Action Type
                <select className={[classes.select]} onChange={e => setActionType(e.target.value)}>
                    <option value="">Select one</option>
                    <option value="DARI_REFRESH_TOKEN">DARI REFRESH TOKEN</option>
                    <option value="DARI_APP_LOGIN">DARI APP LOGIN</option>
                    <option value="INITIATE_APPLICATION">INITIATE APPLICATION</option>
                    <option value="SUBMIT_APPLICATION">SUBMIT APPLICATION</option>
                    <option value="ADD_EMPLOYEE">ADD EMPLOYEE</option>
                </select>
            </label>
            <label class="gridItem">
                Application Type
                <select className={[classes.select]} onChange={e => setApplicationType(e.target.value)}>
                    <option value="">Select one</option>
                    <option value="CERT_TITLE_DEED_PLOT">CERT TITLE DEED PLOT</option>
                    <option value="LEASE_REGISTRATION">LEASE REGISTRATION</option>
                    <option value="ADD_POA">ADD POA</option>
                    <option value="ADD_COMPANY">ADD COMPANY</option>
                    <option value="ADD_COMPANY_EMPLOYEE">ADD COMPANY EMPLOYEE</option>
                    <option value="CERT_PROP_OWNERSHIP">CERT PROP OWNERSHIP</option>
                    <option value="LEASE_CLOSURE">LEASE CLOSURE</option>
                </select>
            </label>
            <label class="gridItem">
                From Date
                <input type="date" className={[classes.input_txt]} onChange={e => setDateFrom(e.target.value)} />
            </label>
            <label class="gridItem">
                To Date
                <input type="date" required={dateFrom ? true : false} className={[classes.input_txt]} onChange={e => setDateTo(e.target.value)} />
            </label>
            <label class="gridItem">
                Application ID
                <input type="text" className={classes.input_txt} placeholder="e.g. 21984/2021" onChange={e => setApplicationId(e.target.value)} />
            </label>
            <div class="gridItem">
                <Button color="primary" variant='contained' onClick={handleSearch}>Search</Button>
            </div>
        </div>
    )
}