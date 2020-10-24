class AndSpecification {
    constructor(...specs) {
        this.specs = specs
    }

    isSatisfied(item) {
        return this.specs.every(spec => spec.isSatisfied(item));
    }
}

export { AndSpecification }