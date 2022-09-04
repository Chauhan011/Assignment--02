async function loadIntoTable(url, table) {
    const tableHead = table.querySelector("thead");
    const tableBody = table.querySelector("tbody");
    const secondHeaderRow = document.createElement("tr");
    const response = await fetch(url);
    const { headers, rows } = await response.json();

    tableHead.innerHTML = "<tr></tr>";
    tableHead.appendChild(secondHeaderRow);
    tableBody.innerHTML = " ";
    let power = [];
    let idle = [];
    let timePeriod = ["Today", "MTD", "YTD"];

    for (const headerText of headers) {
        let headerElement = document.createElement("th");

        if (headerText.search("energy") >= 0) {
            power = [...power, headerText];
            headerElement.innerText = timePeriod[power.length - 1];
            secondHeaderRow.appendChild(headerElement);
            if (power.length === 3) {
                let largeHeader = document.createElement("th");
                largeHeader.textContent = "Energy Consumed";
                largeHeader.colSpan = 3;
                tableHead.querySelector("tr").appendChild(largeHeader);
            }
        }
        else if (headerText.search("idle") >= 0) {
            idle = [...idle, headerText];
            headerElement.innerText = timePeriod[idle.length - 1];
            secondHeaderRow.appendChild(headerElement);
            if (idle.length === 3) {
                let largeHeader = document.createElement("th");
                largeHeader.textContent = "Idle time";
                largeHeader.colSpan = 3;
                tableHead.querySelector("tr").appendChild(largeHeader);
            }
        }
        else {
            headerElement.textContent = headerText;
            headerElement.rowSpan = 2;
            tableHead.querySelector("tr").appendChild(headerElement);
        }
    }

    for (const row of rows) {
        const rowElement = document.createElement("tr");

        for (const cellText of row) {
            const cellElement = document.createElement("td");

            cellElement.textContent = cellText;
            rowElement.appendChild(cellElement);
        }

        tableBody.appendChild(rowElement);
    }
}

loadIntoTable("./data.json", document.querySelector("table"));
