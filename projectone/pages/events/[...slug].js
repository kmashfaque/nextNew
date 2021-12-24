import { useRouter } from "next/router"
import {getFilteredEvents} from "../../dummy-data"
function FilteredEvents() {
    
    const router = useRouter()
    
    const filterData=router.query.slug

    if(!filterData){
        return<p>Loading....</p>
    }

    const filteredYear=filterData[0]
    const filterdMonth = filterData[1]
    
    const numYear = +filteredYear
    const numMonth= +filterdMonth


    if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12) {
        return <p>Invalid filter. Please adjust your values</p>
    }

    const filteredEvents=getFilteredEvents({
        year:numYear,
        month:numMonth
    })

    if(!filteredEvents||filteredEvents.length===0){
        return <p> No events founds for the chosen filter!!</p>
    }
    return(
        <>
        <h1>
            Filtered Events
        </h1>
        </>
    )
}

export default FilteredEvents
