import React, {useState,useEffect,useRef} from 'react';
import './index.css';
import getCurrentDate from '../../utils/common/getCurrentDate'


const TableRow = ({ issue, index, handleIsReviewed }) => {
  const {
    User: { name, email },
    "Risk level": RiskLevel,
    "Trigger reason": TriggerReason,
    "In queue for": InQueueFor,
    "Data added on": DataAddedOn,
    "Previousy reviewed": PreviouslyReviewed,
    "Action reason": ActionReason,
    "Time to close": TimeToClose,
    "Action taken by": ActionTakenBy,
  } = issue;

  const [showOverlay, setShowOverlay] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target)) {
        setShowOverlay(false);
      }
    };
    if (showOverlay) {
      document.addEventListener('click', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [showOverlay]);

  const getFromLocalStorage = (key)=>{
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  }

  const setToLocalStorage = (key,value)=>{
    localStorage.setItem(key, JSON.stringify(value));
  }

  const handleOverlayClick = (action) => {
    setShowOverlay(false);
    let pendingIssues = getFromLocalStorage('Pending_issues') || {};
    let completedIssues = getFromLocalStorage('Completed_issues') || {};
    delete pendingIssues[index];
    let updatedIssue = { ...issue };
    switch (action) {
      case 'restrictedUnflag':
      case 'unflag':
      case 'reviewed':
        updatedIssue['Action reason'] = action === 'reviewed' ? 'Cleared' : 'Flagged';
        updatedIssue['Time to close'] = issue['In queue for'];
        updatedIssue['Action taken by'] = {
          name: 'shash',
          email: 'sk@gmail.com',
        };
        const { "Trigger reason": triggerReason, "In queue for": inQueueFor, "Previousy reviewed": previouslyReviewed, ...newCompletedIssue } = updatedIssue;
        const nextIndex = Object.keys(completedIssues).length;
        completedIssues = { ...completedIssues, [nextIndex]: newCompletedIssue };
        break;
  
      case 'hardFlag':
      case 'tempFlag':
        updatedIssue['Previousy reviewed'] = {
          isReviewed: 'Yes',
          reviewedOn: getCurrentDate(),
        };
        pendingIssues= {...pendingIssues, [Object.keys(completedIssues).length]:updatedIssue};
        break;
  
      default:
        break;
    }
    setToLocalStorage('Pending_issues', pendingIssues);
    setToLocalStorage('Completed_issues', completedIssues);
    handleIsReviewed(true);
  };
  

  return (
    <tr key={index} className='issue-details' onDoubleClick={() => setShowOverlay(true)}>
      <td className='userinfo'>
        <div>
          <span className='name-reason-days'>{name} </span><br />
          <span className="email-date-color">{email}</span>
        </div>
        <a className="open-in-new-window" href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">
          {/* Icon here*/}
          <span>&#x02190;</span>
        </a>
      </td>
      <td >
        <div>
          <span className={`risk-level ${RiskLevel.toLowerCase()}`}></span>
          <span className={`risk-level-color-${RiskLevel.toLowerCase()}`}>{RiskLevel}</span>
          {showOverlay && TriggerReason&& (
            <div className="overlay" ref={overlayRef}>
              <div onClick={() => handleOverlayClick('hardFlag')}>Hard Flag</div>
              <div onClick={() => handleOverlayClick('tempFlag')}>Temp Flag</div>
              <div onClick={() => handleOverlayClick('restrictedUnflag')}>Restricted Unflag</div>
              <div onClick={() => handleOverlayClick('unflag')}>Unflag</div>
              <div onClick={() => handleOverlayClick('reviewed')}>Reviewed</div>
            </div>
          )}
        </div> 
      </td>
     
      <td><span className='name-reason-days'>{TriggerReason || ActionReason} </span>
      </td>
      <td><span className='name-reason-days'>{InQueueFor || TimeToClose} days </span></td>
      <td className="email-date-color">{DataAddedOn}</td>
      <td>
      <span className='name-reason-days'>{(PreviouslyReviewed&& PreviouslyReviewed.isReviewed) || ActionTakenBy.name} </span> <br />
        {PreviouslyReviewed && PreviouslyReviewed.isReviewed === 'Yes' && <span className="email-date-color">{PreviouslyReviewed.reviewedOn}</span>}
        {ActionTakenBy && <span className="email-date-color">{ActionTakenBy.email}</span>}
      </td>
      
    </tr>
  );
};

export default TableRow;
