import React, { useEffect } from 'react';
import s from './InactiveJobs.module.scss';
import LoaderThreeLine from '../../../../UI-components/loaderThreeLine/LoaderThreeLine';
import { NavLink } from 'react-router-dom';
import Vacancy from '../../vacancy/Vacancy';
import { useDispatch, useSelector } from 'react-redux';
import { getJobs } from '../../../../toolkitRedux/reducer/jobsSlice';


const Inactive = () => {
    const state = useSelector(state => state.jobsPage)
    const dispatch = useDispatch();
    // const actions = jobsSlice.actions

    useEffect(() => {
        dispatch(getJobs(state.limit, state.page))
    }, [state.limit, state.page, dispatch])

    return (
        <div className={s.jobs} >
            <div className={s.itemBlock}>
                {state.getJobs.loading
                    ?
                    <div className={s.loaderThreeLine}><LoaderThreeLine /></div>
                    :
                    state.vacancyData.filter(v => v.status === 'INACTIVE').map(v => <NavLink to={`/jobs/activejobs/`}><Vacancy key={v.id} _id={v._id} assignedTo={v.assignedTo
                    } desk={v.desk} position={v.position} description={v.description} location={v.location} department={v.department}
                        createdBy={v.createdBy} status={v.status} salaryMax={v.salaryMax} salaryMin={v.salaryMin} deadlineDate={v.deadlineDate}
                        createdAt={v.createdAt} /></NavLink>)}
            </div>
        </div>
    );
}

export default Inactive;
