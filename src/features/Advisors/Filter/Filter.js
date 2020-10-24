class Filter {
    filter(items, spec) {
        return items.filter(item => spec.isSatisfied(item))
    }
}

export { Filter }