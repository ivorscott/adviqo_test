import React, { useState, useEffect } from "react";
import { fetchAdvisors } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { SortableTable } from "./SortableTable";
import {
Languages,
Availability,
LanguageSpecification,
AvailabilitySpecification,
AndSpecification,
Filter
} from "./Filter";

const Advisors = () => {
  const dispatch = useDispatch();

  const [isOnlineFiltered, setOnlineFilter] = useState(false);
  const [languageSelection, setLanguageSelection] = useState("");

  const [selection, setSelection] = useState(null);
  const { entities, loading } = useSelector((state) => state.advisors);
  const languages = ["All", ...Object.values(Languages)];

  const availableSpec = new AvailabilitySpecification(Availability.Online)

  useEffect(() => {
    const fetch = async () => {
      await dispatch(fetchAdvisors());
    };
    fetch();
  }, [dispatch]);

  const handleLanguageFilter = (language) => {
    const f = new Filter()
    const languageSpec = new LanguageSpecification(language)
    const andSpec = new AndSpecification(languageSpec, availableSpec)

    if (isOnlineFiltered) {
      if (language !== "All") {
        setLanguageSelection(language);
        const data = f.filter(entities, andSpec);
        setSelection(data);
      } else {
        setLanguageSelection("");
        const data = f.filter(entities, availableSpec);
        setSelection(data);
      }
      return;
    }

    if (language === "All") {
      setLanguageSelection("");
      setSelection(null);
      return;
    }

    setLanguageSelection(language);
    const data = f.filter(entities, languageSpec);
    setSelection(data);
  };

  const handleOnlineFilter = () => {
    const f = new Filter()
    const languageSpec = new LanguageSpecification(languageSelection)
    const andSpec = new AndSpecification(languageSpec, availableSpec)

    if (isOnlineFiltered) {
      if (languageSelection) {
        setOnlineFilter(false);
        const data = f.filter(entities, languageSpec);
        setSelection(data);
        return;
      } else {
        setOnlineFilter(false);
        setSelection(null);
        return;
      }
    }

    setOnlineFilter(true);

    if (languageSelection) {
      const data = f.filter(entities, andSpec);
      setSelection(data);
      return;
    }

    const data = f.filter(entities, availableSpec);
    setSelection(data);
  };

  return (
    <SortableTable
      orderFlow="desc"
      orderByCell="reviews"
      loading={loading}
      title="Our Advisors"
      rows={selection || entities}
      languages={languages}
      isOnlineFiltered={isOnlineFiltered}
      onLanguageFilterChange={handleLanguageFilter}
      onOnlineFilterChange={handleOnlineFilter}
    />
  );
};

export { Advisors };
