const untriaged = "https://bugzilla.mozilla.org/rest/bug?include_fields=id,summary,status&chfield=%5BBug%20creation%5D&chfieldfrom=2017-08-02&chfieldto=now&email1=intermittent-bug-filer%40mozilla.bugs&emailreporter1=1&emailtype1=notequals&f1=flagtypes.name&limit=0&o1=notequals&priority=--&product=Core&product=Firefox&product=Firefox%20for%20Android&product=Firefox%20for%20iOS&product=Toolkit&resolution=---&v1=needinfo%3F";

const unassigned = "https://bugzilla.mozilla.org/rest/bug?include_fields=id,summary,status&chfield=%5BBug%20creation%5D&chfieldfrom=2017-08-02&chfieldto=now&email1=intermittent-bug-filer%40mozilla.bugs&email2=nobody%40mozilla.org&emailassigned_to2=1&emailreporter1=1&emailtype1=notequals&emailtype2=exact&f1=flagtypes.name&limit=0&o1=notequals&priority=--&product=Core&product=Firefox&product=Firefox%20for%20Android&product=Firefox%20for%20iOS&product=Toolkit&resolution=---&v1=needinfo%3F";

const known = "https://bugzilla.mozilla.org/rest/bug?include_fields=id,summary,status&chfield=%5BBug%20creation%5D&chfieldfrom=2017-08-02&chfieldto=NOW&email1=intermittent-bug-filer%40mozilla.bugs&emailreporter1=1&emailtype1=notequals&f1=flagtypes.name&f2=cf_status_firefox56&o1=notequals&o2=equals&priority=--&product=Core&product=Firefox&product=Firefox%20for%20Android&product=Firefox%20for%20iOS&product=Toolkit&resolution=---&v1=needinfo%3F&v2=affected";

const enhancements = "https://bugzilla.mozilla.org/rest/bug?include_fields=id,summary,status&bug_severity=enhancement&chfield=%5BBug%20creation%5D&chfieldfrom=2017-08-02&chfieldto=NOW&email1=intermittent-bug-filer%40mozilla.bugs&emailreporter1=1&emailtype1=notequals&f1=flagtypes.name&o1=notequals&priority=--&product=Core&product=Firefox&product=Firefox%20for%20Android&product=Firefox%20for%20iOS&product=Toolkit&resolution=---&v1=needinfo%3F";

const noassignee = "https://bugzilla.mozilla.org/rest/bug?include_fields=id,summary,status&chfield=%5BBug%20creation%5D&chfieldfrom=2016-06-01&chfieldto=Now&email1=nobody%40mozilla.org&emailassigned_to1=1&emailtype1=exact&f1=delta_ts&f2=flagtypes.name&known_name=Orphaned%20P1s&o1=lessthan&o2=notsubstring&priority=P1&product=Core&product=Firefox&product=Firefox%20for%20Android&product=Firefox%20for%20iOS&product=Toolkit&resolution=---&v1=-2w&v2=needinfo%3F";

const stalled = "https://bugzilla.mozilla.org/rest/bug?include_fields=id,summary,status&chfield=%5BBug%20creation%5D&chfieldfrom=2016-06-01&chfieldto=Now&email1=nobody%40mozilla.org&emailassigned_to1=1&emailtype1=notequals&f1=delta_ts&f2=flagtypes.name&o1=lessthan&o2=notsubstring&priority=P1&product=Core&product=Firefox&product=Firefox%20for%20Android&product=Firefox%20for%20iOS&product=Toolkit&resolution=---&v1=-2w&v2=needinfo%3F";

var currentCycle = 'Firefox 57';

var reports = [
    {title: "Untriaged Bugs in Current Cycle",
     name: "untriaged",
     url: untriaged},
    {title: "Unassigned Untriaged Bugs in Current Cycle",
     name: "unassigned",
     url: unassigned},
    {title: "Untriaged Bugs in Current Cycle Affecting Next Release <code>status_firefox56 = affected</code>",
     name: "known",
     url: known},
    {title: "Untriaged Enhancement Requests in Current Cycle",
     name: "enhancements",
     url: enhancements},
    {title: "Orphaned P1s (No Assignee)",
     name: "noassignee",
     url: noassignee },
    {title: "Stalled P1s (No Change in 2W)",
     name: "stalled",
     url: stalled}
];

var first = true;

document.querySelector('body h3 span').insertAdjacentText('beforeend', currentCycle);

reports.forEach(report => {
    document.querySelector('body ul')
    .insertAdjacentHTML('beforeend', `<li class="${report.name}">${report.title}: <span></span></li>`); 

    fetch(report.url)
    .then(res => { return res.json() })
    .then(body => {
        document.querySelector('body ul li.' + report.name + ' span')
        .insertAdjacentText('beforeend', numeral(body.bugs.length).format('0,0'));
    });
})


