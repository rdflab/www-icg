var path = require(`path`)
var fs = require("fs")
fm = require("front-matter")

const twoDigitFormat = (v) => {
  return v > 9 ? `${v}` : `0${v}`
}

const dir = "src/data/events"
var files = fs.readdirSync(dir)

for (let file of files) {
  if (file.endsWith(".md")) {
    console.log(file)

    fs.readFile(`${dir}/${file}`, "utf8", function (err, data) {
      var content = fm(data)

      console.log(content.body.split("\n")[0])

      const title = content.attributes.title
      const start = new Date(content.attributes.start)
      const end = new Date(content.attributes.end)
      const formattedTitle = title.toLowerCase().replace(/ /g, "-")
      const formattedDate = `${start.getFullYear()}-${twoDigitFormat(
        start.getMonth() + 1
      )}-${twoDigitFormat(start.getDate())}`
      const id = `${formattedTitle}-${formattedDate}`
      const icsFile = `static/events/ical/${id}.ics`

      // Create ics files for sharing

      const dtyear = `${start.getFullYear()}${twoDigitFormat(
        start.getMonth() + 1
      )}${twoDigitFormat(start.getDate())}`
      const dtstart = `${dtyear}T${twoDigitFormat(
        start.getHours()
      )}${twoDigitFormat(start.getMinutes())}00`
      const dtend = `${dtyear}T${twoDigitFormat(
        end.getHours()
      )}${twoDigitFormat(end.getMinutes())}00`

      var ws = fs.createWriteStream(icsFile)
      ws.write("BEGIN:VCALENDAR\n")
      ws.write("VERSION:2.0\n")
      ws.write("PRODID:-//hacksw/handcal//NONSGML v1.0//EN\n")
      ws.write("BEGIN:VEVENT\n")
      ws.write(`UID:${id}@columbiaicg.org\n`)
      ws.write(`DTSTAMP:${dtstart}\n`)
      ws.write(`DTSTART:${dtstart}\n`)
      ws.write(`DTEND:${dtend}\n`)
      ws.write(`SUMMARY:${title}\n`)
      ws.write(`DESCRIPTION:${content.body.split("\n")[0]}\n`)
      ws.write(`LOCATION:${content.attributes.location}\n`)
      ws.write("END:VEVENT\n")
      ws.write("END:VCALENDAR\n")
      ws.close()
    })
  }
}

// result.data.events.edges.forEach(({ node }) => {
//     const calEvent = node

//     const title = calEvent.frontmatter.title
//     const start = new Date(calEvent.frontmatter.start)
//     const end = new Date(calEvent.frontmatter.end)
//     const formattedTitle = title.toLowerCase().replace(/ /g, "-")
//     const formattedDate = `${start.getFullYear()}-${twoDigitFormat(
//       start.getMonth() + 1
//     )}-${twoDigitFormat(start.getDate())}`
//     const id = `${formattedTitle}-${formattedDate}`
//     const icsFile = `/events/ical/${id}.ics`

//     // Create ics files for sharing

//     const dtyear = `${start.getFullYear()}${twoDigitFormat(
//       start.getMonth() + 1
//     )}${twoDigitFormat(start.getDate())}`
//     const dtstart = `${dtyear}T${twoDigitFormat(
//       start.getHours()
//     )}${twoDigitFormat(start.getMinutes())}00`
//     const dtend = `${dtyear}T${twoDigitFormat(end.getHours())}${twoDigitFormat(
//       end.getMinutes()
//     )}00`

//     var ws = fs.createWriteStream(`static${calEvent.icsFile}`)
//     ws.write("BEGIN:VCALENDAR\n")
//     ws.write("VERSION:2.0\n")
//     ws.write("PRODID:-//hacksw/handcal//NONSGML v1.0//EN\n")
//     ws.write("BEGIN:VEVENT\n")
//     ws.write(`UID:${calEvent.id}@columbiaicg.org\n`)
//     ws.write(`DTSTAMP:${dtstart}\n`)
//     ws.write(`DTSTART:${dtstart}\n`)
//     ws.write(`DTEND:${dtend}\n`)
//     ws.write(`SUMMARY:${title}\n`)
//     ws.write(`DESCRIPTION:${calEvent.description}\n`)
//     ws.write(`LOCATION:${calEvent.frontmatter.location}\n`)
//     ws.write("END:VEVENT\n")
//     ws.write("END:VCALENDAR\n")
//     ws.close()
//   })
