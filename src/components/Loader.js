import { makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
    loader: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgb(255 255 255 / 46%)',
        zIndex: 999,
    },
    loader_content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }
})
export default function Loader() {
    const classes = useStyles();
    return (
        <div className={classes.loader}>
            <div className={classes.loader_content}>
                Loading...
            </div>
        </div>
    )
}
