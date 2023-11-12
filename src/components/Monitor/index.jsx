import React, {useState,useEffect} from 'react';
import {SearchField, Table, Dropdown, CloseAccountModal} from '../index';
import {getData} from '../../utils/dataService';
import './index.css'

const Monitor = () => {

    const [issueStatus,setIssueStatus] = useState("Pending");
    const [searchInput, setSearchInput] = useState('');

    const [issueDetails,setIssueDetails] = useState(null);
    const [filteredIssues,setFilteredIssues] = useState(null);
    const [issues, setIssues] = useState(null);
    const[ deletedAccounts, setDeletedAccounts] = useState(null);


    const [selectedTriggerReason, setSelectedTriggerReason] = useState(null);
    const [selectedRiskLevel, setSelectedRiskLevel] = useState(null);

    const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
    const [isReviewed, setIsReviewed] = useState(false);

    useEffect(() => {
      const fetchData = () => {
        try {
          let details;
          let isssues;
          if (issueStatus === "Pending") {
            details = getFromLocalStorage("Pending_details");
            isssues = getFromLocalStorage("Pending_issues")
            if(details==null ||isssues==null){
              console.log("not set");
              details =  getData.pendingDetails();
              isssues =  getData.pendingIssues();
              isssues = filterIssues(isssues);
              setToLocalStorage("Pending_details",details);
              setToLocalStorage("Pending_issues",isssues);
            }
          } else if (issueStatus === "Completed") {
            details = getFromLocalStorage("Completed_details");
            isssues = getFromLocalStorage("Completed_issues")
           if(details==null ||isssues==null){
              details =  getData.completedDetails();
              isssues =  getData.completedIssues();
              isssues = filterIssues(isssues);
              setToLocalStorage("Completed_details",details);
              setToLocalStorage("Completed_issues",isssues);
            }
          }
          setIssues(isssues);
          setIssueDetails(details);
          setIsReviewed(false)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      const filterIssues = (isuesData)=>{
        let deletedAccounts = getFromLocalStorage("deleted_accounts");
        if(deletedAccounts==null){
          deletedAccounts = getData.deletedAccount();
          console.log(deletedAccounts,"deletedAccounts");
          setToLocalStorage("deleted_accounts",deletedAccounts);
          setDeletedAccounts(deletedAccounts);
        }
        const filteredIssues = Object.keys(isuesData).reduce((filteredIssues, key) => {
            const email = isuesData[key].User.email;
        
            if (!deletedAccounts.includes(email)) {
              filteredIssues[key] = isuesData[key];
            }
        
            return filteredIssues;
          }, {});
        
          return filteredIssues;
    }
      fetchData();
    }, [issueStatus, deletedAccounts, isReviewed]);

    const getFromLocalStorage = (key)=>{
      const value = localStorage.getItem(key);
      return JSON.parse(value);
    }

    const setToLocalStorage = (key,value)=>{
      localStorage.setItem(key, JSON.stringify(value));
    }

    const handleIsReviewed= ()=>{
      setIsReviewed(true);
    }
    useEffect(() => {
      if (!issues) {
        return;
      }

      let tempFilteredIssues = Object.values(issues).filter((issue) =>
        issue.User.name.toLowerCase().includes(searchInput.toLowerCase())
      );
    
      tempFilteredIssues = tempFilteredIssues.filter((issue) => {
        if (selectedTriggerReason && issue['Trigger reason'] !== selectedTriggerReason) {
          return false;
        }
        if (selectedRiskLevel && issue['Risk level'] !== selectedRiskLevel) {
          return false;
        }
        return true;
      });
    
      setFilteredIssues(tempFilteredIssues);
    }, [searchInput, issues, selectedTriggerReason, selectedRiskLevel]);
    
    const sortIssues = (column,order)=>{
      if (!column || !order) {
        return;
      }
    
      const sortedIssues = [...filteredIssues].sort((a, b) => {
        const aValue = a[column];
        const bValue = b[column];

        if (column === 'Risk level') {
          const orderMap = { Low: 1, Medium: 2, High: 3 };
          return order === 'asc' ? orderMap[aValue] - orderMap[bValue] : orderMap[bValue] - orderMap[aValue];
        }
    
        return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      });
    
      setFilteredIssues(sortedIssues);
    };

    const handleStatusClick = (status) => {
      console.log(status,"status");
      setIssueStatus(status);
    };

    const handleSearchChange = (event) => {
      setSearchInput(event.target.value);
    };
    
    const getUniqueTriggerReasons = (issues) => {
      const uniqueTriggerReasons = new Set();
      Object.values(issues).forEach((issue) => {
        uniqueTriggerReasons.add(issue['Trigger reason']);
      });
      return Array.from(uniqueTriggerReasons);
    };
  
    const getUniqueRiskLevels = (issues) => {
      const uniqueRiskLevels = new Set();
      Object.values(issues).forEach((issue) => {
        uniqueRiskLevels.add(issue['Risk level']);
      });
      return Array.from(uniqueRiskLevels);
    };

    const openModal = () => {
      setIsCloseModalOpen(true);
    };
  
    const closeModal = () => {
      setIsCloseModalOpen(false);
    };
  
    const handleAccountClosure = (formData) => {
      const { email } = formData;
      const updatedDeletedAccounts = [...deletedAccounts, email];
      setDeletedAccounts( updatedDeletedAccounts)
      setToLocalStorage("deleted_accounts",updatedDeletedAccounts);
      closeModal();
    };
  

  return (
    <div className="monitor-container">
      <div className="title-div">
        <span className="monitor-title">Monitoring</span>
      </div>

      <div className="button-div">
        <div>
            <button className={`issue-button ${issueStatus==="Pending"?'active':''}`} onClick={()=>handleStatusClick("Pending")}>Pending</button>
            <button className={`issue-button ${issueStatus==="Completed"?'active':''}`} onClick={()=>handleStatusClick("Completed")}>Completed</button>
        </div>
        <button className="close-account-button" onClick={openModal}>Close Account</button>
        <CloseAccountModal
        isOpen={isCloseModalOpen}
        onClose={closeModal}
        onCloseAccount={handleAccountClosure}
      />
      </div>
      <div className="horizontal-line"></div>
      <div className="search-div">
        <SearchField  onChange={handleSearchChange} />
        {issues && <div className="dropdown-container">
          <Dropdown
            options={getUniqueRiskLevels(issues)}
            onSelect={setSelectedRiskLevel}
            display = "Risk Level"
          />
        </div>}
        {issues && <div className="dropdown-container">
          <Dropdown
            options={getUniqueTriggerReasons(issues)}
            onSelect={setSelectedTriggerReason}
            display = "Trigger Reason"
          />
        </div>}
      </div>

      <div className="table-div">
        <Table issueDetails={issueDetails} issues={filteredIssues} handleIsReviewed={handleIsReviewed} sortIssues={sortIssues}/>
      </div>

    </div>
  );
};

export default Monitor;
