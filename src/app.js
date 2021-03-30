// const fs = require('fs');
const CONST = {
	START_DAY: 480,
	END_DAY: 1079,
	MEET_LENGTH: 60,
	MIN_DAY: 1,
	MAX_DAY: 5,
}

const parseAndSortByKey = input => {
	const formattedObj = input.split('\n')
		.map(entry =>
			entry.replace(' ', ',')
				.replace('-', ',')
				.split(',')
		)
		.reduce((acc, item) => {
			const [key, startRange, endRange] = item;
			acc[key] = acc[key] || []
			acc[key].push([startRange, endRange])

			return acc
		}, {})

	for (entries in formattedObj) {
		formattedObj[entries].sort((a, b) => {
			return a[0].localeCompare(b[0])
		})
	}

	return formattedObj;
}

const isFree = (current, arr) => {
	// Test si la end range de la range testée intersecte avec la start range du prochan slot,
	// Test si la start range de la range testée intersecte avec la end range du prochain slot.
	return (current[1] < arr[0] || current[0] > arr[1])
}

const formatHStr = (timeString) => {
	return timeString < 10 ? '0' + timeString : timeString
}

const findRange = input => {
	const arr = parseAndSortByKey(input);

	for (var i = 1; i <= CONST.MAX_DAY; ++i) {
		// Itère sur tous les slots d'une journée donnée
		for (let current = CONST.START_DAY; current <= CONST.END_DAY - CONST.MEET_LENGTH; ++current) {
			// arr[i] = l'ensemble des slots à tester sur une journée;
			for (let testSlotCount = 0; testSlotCount < arr[i].length; ++testSlotCount) {
				let [startRange, endRange] = [
					arr[i][testSlotCount][0].split(':').map(number => +number),
					arr[i][testSlotCount][1].split(':').map(number => +number)
				]

				startRange = startRange[0] * 60 + startRange[1]
				endRange = endRange[0] * 60 + endRange[1]
				if (!isFree([current, current + CONST.MEET_LENGTH - 1], [startRange, endRange])) {
					current = endRange;
					// break pour itérer sur le prochain slot si le slot intersecte avec une range présente
					break;
				} else if (testSlotCount === arr[i].length - 1) {
					let freeStart = [Math.floor(current / 60), current % 60]
					let freeEnd = [Math.floor((current + CONST.MEET_LENGTH - 1) / 60), (current + CONST.MEET_LENGTH - 1) % 60]
					return (
						`${i} ${formatHStr(freeStart[0])}:${formatHStr(freeStart[1])}-${formatHStr(freeEnd[0])}:${formatHStr(freeEnd[1])}`
					)
				}
			}
		}
	}
}

module.exports = {
	findRange,
}
