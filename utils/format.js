exports.formatUserSelections = (selections) => {
    return selections.map(selection => {
        const timeSlot = selection.time_slot;
        const seesion = timeSlot?.seesion;
        const stage = seesion?.stage;
        const campaign = stage?.campaign;

        return {
            id: selection.id,
            user_id: selection.user_id,
            time_slot: {
                id: timeSlot?.id,
                start_time: timeSlot?.start_time,
                end_time: timeSlot?.end_time,
                max_seats: timeSlot?.max_seats,
                booked_seats: timeSlot?.booked_seats,
                is_available: timeSlot?.is_available,
                seesion: {
                    id: seesion?.id,
                    title: seesion?.title,
                    start_time: seesion?.start_time,
                    end_time: seesion?.end_time,
                    location: seesion?.location,
                    stage: {
                        id: stage?.id,
                        title: stage?.title,
                        description: stage?.description,
                        campaign: {
                            id: campaign?.id,
                            title: campaign?.title,
                            description: campaign?.description,
                            start_date: campaign?.start_date,
                            end_date: campaign?.end_date,
                            is_active: campaign?.is_active
                        }
                    }
                }
            },
            selection_status: selection.selection_status,
            createdAt: selection.createdAt,
            updatedAt: selection.updatedAt
        };
    });
};