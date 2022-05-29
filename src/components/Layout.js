import { makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
    generalLayout: {
       padding: 15
    },
    loggerLayout: {
        background: '#f9f9f9',
        width: '100%',
    }
})
export default function Layout({ children }) {
    const classes = useStyles();
    return (
        <div className={classes.generalLayout}>
            <div className={classes.loggerLayout}>
                {children}
            </div>
        </div>
    )
}
