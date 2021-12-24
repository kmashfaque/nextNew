import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import Button from "../../components/ui/button";
import { Fragment } from "react";
import ResultsTitle from "../../components/events/results-title/results-title";

function FilteredEvents() {
  const router = useRouter();

  const filterData = router.query.slug;

  if (!filterData) {
    return <p>Loading....</p>;
  }

  const filteredYear = filterData[0];
  const filterdMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filterdMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <Fragment>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
        <p>Invalid filter. Please adjust your values</p>
      </Fragment>
    );
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <p> No events founds for the chosen filter!!</p>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);
  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export default FilteredEvents;
