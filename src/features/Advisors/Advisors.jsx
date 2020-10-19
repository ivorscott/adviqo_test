import React, { useState, useEffect } from "react";
import { fetchAdvisors } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { SortableTable } from "./SortableTable";
import {
  filterByOnline,
  filterByLanguage,
  filterByLanguageAndOnline,
} from "./filters";

const Advisors = () => {
  const dispatch = useDispatch();

  const [isOnlineFiltered, setOnlineFilter] = useState(false);
  const [languageSelection, setLanguageSelection] = useState("");

  const [selection, setSelection] = useState(null);
  const { entities, loading } = useSelector((state) => state.advisors);
  const languages = ["All", ...new Set(entities.map((item) => item.language))];

  useEffect(() => {
    const fetch = async () => {
      await dispatch(fetchAdvisors());
    };
    fetch();
  }, [dispatch]);

  const handleLanguageFilter = (language) => {
    if (isOnlineFiltered) {
      if (language !== "All") {
        setLanguageSelection(language);
        const data = filterByLanguageAndOnline(entities, language);
        setSelection(data);
      } else {
        setLanguageSelection("");
        const data = filterByOnline(entities);
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
    const data = filterByLanguage(entities, language);
    setSelection(data);
  };

  const handleOnlineFilter = () => {
    if (isOnlineFiltered) {
      if (languageSelection) {
        setOnlineFilter(false);
        const data = filterByLanguage(entities, languageSelection);
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
      const data = filterByLanguageAndOnline(entities, languageSelection);
      setSelection(data);
      return;
    }

    const data = filterByOnline(entities);
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
