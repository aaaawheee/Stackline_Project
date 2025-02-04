# Product Sale Visualization

This project is a product sale page that provides a visual representation of retail and wholesale sales data. The main feature is an interactive graph that allows users to visualize sales performance, with the ability to toggle between smoothed (averaged) data and actual data points.

## Prerequisites

Before running the project, make sure you have **Node.js** installed on your machine.

1. [Download and install Node.js](https://nodejs.org/) if you haven't already.

## Running the Project

- Install dependencies:
  ```bash
  npm install

- Run Project :
  ```bash
  npm run dev

## Functionality
### Product Display
The product is displayed on the left side of the page, with necessary tags and other relevant information about the product.
### Graph
  - The main highlight of the page is a graph that visualizes the retail and wholesale sales prices. Data is diplayed in exact format in which the column of Sale-Table is sorted
    - Y-Axis represents the sale price.
    - X-Axis represents the date-wise sales data.
  - Two Types of Visualization:
    - Base Graph (Smoothed):
      - This graph displays the averaged retail and wholesale sales for each month and year. It is useful to see an overall trend of the sales data.
    - Actual Data Points:
      - By hovering and clicking on each month, the graph will display the actual retail and wholesale sales data points for that month.
      - You can restore to the Base Graph by using the Restore button on the graph.
### Table
  - The table below the graph shows the same data as the graph, in tabular format.
  - Sorting:
    - You can click on any column header to sort the data in ascending or descending order based on that column.
    - The table also allows sorting of data for each month by clicking the column header.
### Summary
This project allows users to visualize and interact with product sales data in both a graphical and tabular format. The key features include:
  - Interactive graph with retail and wholesale sales data.
  - Two graph views:
    - Base (Averaged) Graph
    - Actual Monthwise Data Points.
  - Table with sortable columns for viewing sales data.
  - Option to restore to the Base Graph after clicking on a specific month.
