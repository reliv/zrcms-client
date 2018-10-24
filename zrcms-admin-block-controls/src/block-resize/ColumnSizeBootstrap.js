export const defaultClass = 'col-sm-12';

/**
 * {ColumnSizeBootstrap}
 */
export default class ColumnSizeBootstrap {
    constructor() {
        this.totalWidthColumns = 12;
        this.defaultClass = defaultClass;
    }

    getDefaultClass() {
        return this.defaultClass;
    }

    /**
     * getColumnWidth
     * @param {number} totalWidth
     * @returns {number}
     */
    getColumnWidthPx(totalWidth) {
        return (totalWidth / this.totalWidthColumns);
    }

    /**
     * getPartWidthColumns
     * @param totalWidthPx
     * @param partWidthPx
     * @returns {number}
     */
    getPartWidthColumns(totalWidthPx, partWidthPx) {
        let columnWidthPx = this.getColumnWidthPx(totalWidthPx);

        return Math.ceil(partWidthPx / columnWidthPx);
    }

    /**
     * buildClass
     * @param columnData
     * @returns {string}
     */
    buildClass(columnData) {
        let classes = '';

        let className = '';
        let mediaView = null;
        for (mediaView in columnData) {

            for (let detail in columnData[mediaView]) {

                className = '';

                if (detail === 'width' && columnData[mediaView][detail] !== 0) {

                    className = 'col' + '-' + mediaView + '-' + columnData[mediaView][detail];
                }

                if (detail === 'offset' && columnData[mediaView][detail] !== 0) {

                    className = 'col' + '-' + mediaView + '-' + detail + '-' + columnData[mediaView][detail];
                }

                if (detail === 'visible' && columnData[mediaView][detail] !== '') {
                    className = 'visible' + '-' + mediaView + '-' + columnData[mediaView][detail];
                }

                if (detail === 'hidden' && columnData[mediaView][detail]) {
                    className = 'hidden' + '-' + mediaView;
                }

                if (className !== '') {
                    classes = classes + className + ' ';
                }
            }
        }

        classes = classes.replace(/^\s+|\s+$/g, '');

        if (classes === '') {
            classes = this.defaultClass;
        }

        return classes;
    };

    /**
     * @param currentClass
     * @return {{xs: {width: number, offset: number, visible: string, hidden: boolean}, sm: {width: number, offset: number, visible: string, hidden: boolean}, md: {width: number, offset: number, visible: string, hidden: boolean}, lg: {width: number, offset: number, visible: string, hidden: boolean}}}
     */
    getColumnData(currentClass) {
        if (!currentClass) {
            currentClass = defaultClass;
        }
        currentClass = currentClass.replace(/^\s+|\s+$/g, '');

        let classes = currentClass.split(' ');

        let data = {
            'xs': {
                width: 0,
                offset: 0,
                visible: '',
                hidden: false
            },
            'sm': {
                width: 0,
                offset: 0,
                visible: '',
                hidden: false
            },
            'md': {
                width: 0,
                offset: 0,
                visible: '',
                hidden: false
            },
            'lg': {
                width: 0,
                offset: 0,
                visible: '',
                hidden: false
            }
        };

        let part;
        let part3;

        for (let index in classes) {

            part = classes[index].split('-');

            if (part[0] === 'col') {

                if (part.length === 3) {
                    data[part[1]].width = Number(part[2]);
                }

                if (part.length === 4) {
                    data[part[1]][part[2]] = Number(part[3]);
                }
            }

            if (part[0] === 'visible') {
                part3 = '';
                if (part[3]) {
                    part3 = part[3];
                }

                data[part[1]]['visible'] = part3;

                data[part[1]]['hidden'] = false;
            }

            if (part[0] === 'hidden') {

                data[part[1]]['visible'] = '';

                data[part[1]]['hidden'] = true;
            }
        }

        return data;
    };
}
