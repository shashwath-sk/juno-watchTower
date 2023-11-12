import issues from '../../data/issues.json';
import user from '../../data/user.json';
import viewbar from '../../data/viewbar.json';


const userDetails = ()=>{
    return user.details;
}

const viewbarFeatures=()=>{
    return viewbar.features;
}

const pendingIssues = ()=>{
    return issues.pending.pending_issues;

}

const pendingDetails = ()=>{
    return issues.pending.Pending_details
}

const completedIssues = ()=>{
    return issues.completed.completed_issues;
}

const completedDetails = ()=>{
    return issues.completed.Completed_details
}

const deletedAccount=()=>{
    return issues.deleted_account || []
}


export default {
    userDetails,
    viewbarFeatures,
    pendingIssues,
    pendingDetails,
    completedIssues,
    completedDetails,
    deletedAccount
}