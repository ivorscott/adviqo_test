const Availability = Object.freeze({
    Online: 'Online',
    Offline: 'Offline',
})

class AvailabilitySpecification {
    constructor(status) {
        this.status = status
    }

    isSatisfied(item) {
        return item.status === this.status
    }
}

export { AvailabilitySpecification, Availability }