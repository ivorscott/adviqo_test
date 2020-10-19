import React from "react";
import { render, screen } from "@testing-library/react";
import { SortableTable } from "./SortableTable";
import { mockAdvisors, mockLanguages } from "./__mock__/advisors";
import { pending, succeeded } from "../../../shared/constants";

describe("SortableTable Component", () => {
  test("Displays loading component while waiting", async () => {
    render(
      <SortableTable
        orderFlow="desc"
        orderByCell="reviews"
        loading={pending}
        title="Our Advisors"
        rows={mockAdvisors}
        languages={mockLanguages}
        onLanguageFilterChange={() => {}}
        onOnlineFilterChange={() => {}}
      />
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.queryAllByRole("advisor").length).toBeFalsy();
  });

  test("Displays table rows with advisors", async () => {
    render(
      <SortableTable
        orderFlow="desc"
        orderByCell="reviews"
        loading={succeeded}
        title="Our Advisors"
        rows={mockAdvisors}
        languages={mockLanguages}
        onLanguageFilterChange={() => {}}
        onOnlineFilterChange={() => {}}
      />
    );

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.queryAllByRole("advisor").length).toBeTruthy();
  });

  test("Displays 'No Data' when empty rows exist", async () => {
    render(
      <SortableTable
        orderFlow="desc"
        orderByCell="reviews"
        loading={succeeded}
        title="Our Advisors"
        rows={[]}
        languages={mockLanguages}
        onLanguageFilterChange={() => {}}
        onOnlineFilterChange={() => {}}
      />
    );

    expect(screen.getByText("No Data")).toBeInTheDocument();
  });
});
