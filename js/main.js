// a collection of the data types for the HL7
const hdFields = [ "Namespace Id", "Universal Id", "Universal Id Type" ];
// the actual messages we send
const segments = {
  "FHS": { cardLabel: "File Header", rowLabels: [
    "File Field Separator",
      "File Encoding Characters",
      { rowId: "FHS3", rowLabel: "File Sending Application", rowLabels: hdFields },
      { rowId: "FHS4", rowLabel: "File Sending Facility", rowLabels: hdFields },
      { rowId: "FHS5", rowLabel: "File Receiving Application", rowLabels: hdFields },
      { rowId: "FHS6", rowLabel: "File Receiving Facility", rowLabels: hdFields },
      "File Creation Date/Time"
    ] },
  "BHS": { cardLabel: "Batch Header", rowLabels: [
      "File Field Separator",
      "File Encoding Characters",
      { rowId: "BHS3", rowLabel: "File Sending Application", rowLabels: hdFields },
      { rowId: "BSH4", rowLabel: "File Sending Facility", rowLabels: hdFields },
      { rowId: "BSH5", rowLabel: "File Receiving Application", rowLabels: hdFields },
      { rowId: "BSH6", rowLabel: "File Receiving Facility", rowLabels: hdFields },
      "File Creation Date/Time"
    ] },
  "MSH": { cardLabel: "Message Header", rowLabels: [
      "Field Separator",
      "Encoding Characters",
      "Sending Application",
      "Sending Facility",
      "Receiving Application",
      "Receiving Facility",
      "Date/Time of Message",
      "Security",
      "Message Type",
      "Message Control Id",
      "Processing Id",
      "Version Id",
      "Sequence Number",
      "Continuation Pointer",
      "Accept Acknowledgement Type",
      "Application Acknowledgement Type",
      "Country Code",
      "Character Set",
      "Principal Language of Message",
      "Alternate Character Set Handling Scheme",
      "Message Profile Identifier",
      "Sending Responsible Organization",
      "Receiving Responsible Organization",
      "Sending Network Address",
      "Receiving Network Address"
    ]
  },
  "NTE": { cardLabel: "Notes and Comments", rowLabels: [
      "Set Id",
      "Source of Comment",
      "Comment",
      { rowId: "NTE4", rowLabel: "Comment Type", rowLabels: [
          "Identifier", "Text", "Name of Coding System", "Alternate Identifier",
          "Alternate Text", "Name of Alternate Coding System", "Coding System Version Id",
          "Alternate Coding System Version", "Original Text", "Second Alternate Identifier",
          "Second Alternate Text"
        ] },
      "Entered By",
      "Entered Date/Time",
      "Effective Start Date",
      "Expiration Date",
    ] },
  "PID": { cardLabel: "Patient Identification", rowLabels: [
      "Set Id",
      "Patient Id",
      "Patient Identifier List",
      "Alternate Patient Id",
      "Patient Name",
      "Mother's Maiden Name",
      "Date/Time of Birth",
      "Administrative Sex",
      "Patient Alias",
      "Race",
      "Patient Address",
      "County Code",
      "Phone Number - Home",
      "Phone Number - Business",
      "Primary Language",
      "Marital Status",
      "Religion",
      "Patient Account Number",
      "Ssn Number - Patient",
      "Driver's Licence Number - Patient",
      "Mother's Identifier",
      "Ethnic Group",
      "Birth Place",
      "Multiple Birth Indicator",
      "Birth Order",
      "Citizenship",
      "Veterans Military Status",
      "Nationality",
      "Patient Death Date and Time",
      "Patient Death Indicator",
      "Identity Unknown Indicator",
      "Identity Reliability Indicator",
      "Last Update Date/Time",
      "Last Update Facility",
      "Taxonomic Classification Code",
      "Breed Code",
      "Strain",
      "Production Class Code",
      "Tribal Citizenship",
      "Patient Telecommunication Information"
    ] },
  "ORC": { cardLabel: "Common Order", rowLabels: [
      "Order Control",
    ]},
  "OBR": { cardLabel: "Observation Request", rowLabels: [
      "Set Id", "Placer Order Number", "Filler Order Number", "Universal Service Identifier",
      "Priority", "Requested Date/Time", "Observation Date/Time #", "Observation End Date/Time #",
      "Collection Volume", "Collector Identifier", "Specimen Action Code", "Danger Code",
      "Relevant Clinical Information", "Specimen Received Date/Time", "Specimen Source",
      { rowId: "OBR16", rowLabel: "Ordering Provider", rowLabels: [
          "Person Identifier", "Family Name", "Given Name", "Second and Further Given Name",
          "Suffix", "Prefix", "Degree", "Source Table", "Assigning Authority", "Name Type Code",
          "Identifier Check Digit", "Check Digit Scheme", "Identifier Type Code", "Assigning Facility",
          "Name Representation Code", "Name Context", "Name Validity Range", "Name Assembly Order",
          "Effective Date", "Expiration Date", "Professional Suffix", "Assigning Jurisdiction",
          "Assigning Agency or Department", "Security Check", "Security Check Scheme"
        ] },
      "Order Callback Phone Number",
    ]},
  "OBX": { cardLabel: "Observation Result", rowLabels: [
      "Set Id",
    ]},
  "SPM": { cardLabel: "Specimen", rowLabels: [
      "Set Id", "Specimen Id", "Specimen Parent Ids",
      { rowId: "SPM4", rowLabel: "Specimen Type", rowLabels: [ "Identifier", "Text", "Name of Coding System" ] },
      "Specimen Type Modifier",
      "Specimen Additives", "Specimen Collection Method", "Specimen Source Site", "Specimen Source Site Modifier",
      "Specimen Collection Site", "Specimen Role", "Specimen Collection Amount", "Grouped Specimen Count",
      "Specimen Description", "Specimen Handling Code", "Specimen Risk Code", "Specimen Collection Date/Time",
      "Specimen Received Date/Time", "Specimen Expiration Date/Time", "Specimen Availability", "Specimen Reject Reason",
      "Specimen Quality", "Specimen Appropriateness", "Specimen Condition", "Specimen Current Quantity",
      "Number of Specimen Containers", "Container Type", "Container Condition", "Specimen Child Role",
      "Accession Id", "Other Specimen Id", "Shipment Id"
    ]},
  "SFT": { cardLabel: "Software Segment", rowLabels: [ "Software Vendor Organization", "Release Number", "Software Product Name", "Software Binary Id", "Software Product Information", "Software Install Date" ] },
  "FTS": { cardLabel: "File Trailer", rowLabels: [ "File Batch Count", "File Batch Comment" ] },
  "BTS": { cardLabel: "Batch Trailer", rowLabels: [ "Batch Message Count", "Batch Comment", "Batch Totals" ] },
};

splitLineIntoArray = (segmentType, line = "", length = 0, delim = "|") => {
  const values = Array(length);
  line = line.trim();

  if (line && line.length > 0) {
    let idx = 0;
    for (const val of line.split(delim)) {
      if (val.toUpperCase() === segmentType.toUpperCase()) continue;

      values[idx++] = val;
    }
  }

  for (let i = 0; i < values.length; i++) {
    if (values[i] === undefined)
      values[i] = "";
  }

  console.log(values);

  return values;
}

getCardTemplate = (cardTitle = "", ...cardBodyRows) => `
    <div class="card mt-2">
        <div class="card-header">${cardTitle}</div>
        <div class="card-body">
            <div class="container">
                ${cardBodyRows.join(" ")}
            </div>
        </div>
    </div>
  `;

getCardBodyRows = (rowLabel, rowValue = "", subElementDelimiter = "^") => {
  const emptyClass = rowValue.trim().length === 0 ? "d-none" : "";
  if (typeof rowLabel === "string") {
    return `
      <div class="row ${emptyClass}">
          <div class="col-sm font-weight-bold">${rowLabel}</div><div class="col-sm">${rowValue}</div>
      </div>`;
  } else if (typeof rowLabel === "object") {
    if (rowValue.trim().length === 0) {
      return `
        <div class="row ${emptyClass}">
            <div class="col-sm font-weight-bold">${rowLabel.rowLabel}</div><div class="col-sm">&nbsp;</div>
        </div>`;
    }

    const subElementValues = rowValue.split(subElementDelimiter);
    const subElementLabels = rowLabel.rowLabels;
    const subElements = subElementLabels.map((l, i) => getCardBodyRows(l, subElementValues[i]));
    return `
      <div class="row">
        <div class="col-sm p-2">
            <div class="card">
                <div class="card-header" id="heading-${rowLabel.rowId}">
                    <button class="btn btn-link" data-toggle="collapse" data-target="#collapse-${rowLabel.rowId}" aria-controls="collapse-${rowLabel.rowId}">${rowLabel.rowLabel} - ${rowValue}</button>
                </div>
                <div id="collapse-${rowLabel.rowId}" class="collapse border border-secondary" aria-labelledby="heading-${rowLabel.rowId}">
                    <div class="card-body">
                        <div class="container">${subElements.join(" ")}</div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    `;
  }
  else {
    return ``;
  }
}

parseDocument = () => {
  const selector = "#divParsedDocument";
  const delimiter = "|";

  const message = $("#txtHL7Message").val();
  const messageParts = message.split(/(\r?\n)/);

  let messageCount = 0;
  let parentElement = null;

  // clear our body
  $(selector).empty();

  for (const part of messageParts) {
    const segmentType = part.substring(0,3).toUpperCase();
    const segment = segments[segmentType];

    if (segment === undefined)
      continue;

    const values = splitLineIntoArray(segmentType, part, 3, delimiter);
    const labels = segment.rowLabels;

    if (segmentType === "MSH") {
      // close out the accordion
      if (messageCount > 0) {
        $(selector).first().append(`</div>`);
      }

      $(selector).first().append(`<div id="accordion-${messageCount}" class="mt-4 p-2 border border-primary rounded">`);
      parentElement = `#accordion-${messageCount}`;
      messageCount++;
    }

    // a few segments need the delimiter added to the front. don't ask me. shit's weird
    if (segmentType === "FHS" || segmentType === "BHS" || segmentType === "MSH")
      values.unshift(delimiter);

    // reset the parent selector
    if (segmentType === "FHS" || segmentType === "BHS")
      parentElement = selector;

    $(parentElement).first().append(
      getCardTemplate(segment.cardLabel,
        ...labels.map((l, i) => getCardBodyRows(l, values[i]))));
  }

  return false;
};

// toggles all the empty fields
toggleEmptyFields = () => {
  const showEmpty = $("#chkToggleEmpty").is(":checked");

  if (showEmpty) {
    $(".row.d-none").addClass("d-block").removeClass("d-none");
  } else {
    $(".row.d-block").addClass("d-none").removeClass("d-block");
  }
};

$(document).ready(() => {
  console.log("Body is ready");
});
