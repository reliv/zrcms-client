import DomBlockColumnSize from './DomBlockColumnSize'
import ColumnSizeBootstrap from "./ColumnSizeBootstrap";

const domBlockColumnSize = new DomBlockColumnSize(
    new ColumnSizeBootstrap()
);

/**
 * @return {DomBlockColumnSize}
 */
export default function getInstance() {
    return domBlockColumnSize;
}
