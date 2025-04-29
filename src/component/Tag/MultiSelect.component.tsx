import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Theme, useTheme } from "@mui/material/styles";
import { Tag } from "../../myApi";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

interface Props {
  tags: Tag[];
  selectedIds: string[];
  setSelectedIds: (e: string[]) => void;
}

export default function MultipleSelectChip({
  tags,
  selectedIds,
  setSelectedIds,
}: Props) {
  const getLabelBasedOnId = (id: string) => {
    console.log(id, tags, typeof id);
    return tags.filter((t) => t.id.toString() === id.toString())?.[0]?.name;
  };
  const theme = useTheme();

  //   React.useEffect(() => {
  //     setIds(tags.map((tag) => tag.id));
  //   });

  const handleChange = (event: SelectChangeEvent<typeof selectedIds>) => {
    const {
      target: { value },
    } = event;
    setSelectedIds(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedIds}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={getLabelBasedOnId(value)} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {tags.map((t) => (
            <MenuItem
              key={t.id}
              value={t.id}
              style={getStyles(t.id.toString(), selectedIds, theme)}
            >
              {t.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
