import React from "react";
import InfoCard from '../Component/infoCard'
import {ReactComponent as UserRole} from '../assets/Icons/userRole.svg'
import {ReactComponent as PersonalInformation} from '../assets/Icons/personalInfo.svg'
import {ReactComponent as AuditTrail} from '../assets/Icons/auditTrail.svg'
import {ReactComponent as ManageAccess} from '../assets/Icons/manageAccess.svg'
import {ReactComponent as PeriodicReview} from '../assets/Icons/periodicReview.svg'
import {ReactComponent as Account} from '../assets/Icons/account.svg'
import Footer from "../Component/footer"

const InfoBinder = ({navigate}) => {
    return(
        <div style={{"display": 'flex', 'flexDirection': 'column'}}>
            <div style={{ "fontFamily":"'Source Sans Pro'", "fontStyle":"normal", "fontWeight":"700", "fontSize":"3.16vw", "display":"flex", "alignItems":"center", "color":"#023047"}}>
                My Information Binder
            </div>
            <div style={{ "fontFamily":"'Roboto'", "fontStyle":"normal", "fontWeight":"400", "fontSize":"1.3vw", "display":"flex", "alignItems":"center", "color":"#62697B", "paddingBottom": "1%"
            }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elit ultrices diam a nibh eget nibh massa. Tellus rhoncus volutpat libero sit in fusce augue id.
            </div>
            <div style={{"display": 'flex', 'flexDirection': 'row', 'flexWrap': 'wrap', 'flexBasis': '33%'}}>
                <InfoCard title='My Roles' description='View yoaur Testator and Executors’ information binders.' Icon = {<UserRole/>}/>
                <InfoCard title='Personal Information' description='Enter or update your contact information.' Icon={<PersonalInformation/>}/>
                <InfoCard title='Audit Trail' description='Keep track of when info was reviewed or updates were made.' Icon={<AuditTrail/>}/>
                <InfoCard title='Manage Access' description='Select the family, friends or professionals with whom to share info and how much.' Icon={<ManageAccess/>}/>
                <InfoCard title='Periodic Review' description='Remind yourself to update your info every 3 - 6 months.' Icon={<PeriodicReview/>}/>
                <InfoCard title='Account' description='Change subscriptions, make payments or set preferences.' Icon={<Account/>}/>
                <InfoCard title='My Roles' description='View yoaur Testator and Executors’ information binders.' Icon={<UserRole/>}/>
            </div>
            <Footer/>
        </div>
    )
}

export default InfoBinder